<template>
  <div class="user-view">
    <div class="block">
      <p v-if="loadError" class="error">{{ loadError }}</p>
      <form @submit.prevent="submitForm">
        <InputLine
          name="username"
          v-model="username"
          autocomplete="off"
          autofocus
          :disabled="saving"
        />
        <InputLine
          name="password"
          type="password"
          v-model="password"
          autocomplete="off"
          :disabled="saving"
        />
        <p class="hint">Leave the password empty to keep your current one.</p>
        <div class="actions">
          <TheButton type="submit" :disabled="saving">
            {{ saving ? 'Saving…' : 'Save' }}
          </TheButton>
        </div>
      </form>
      <p v-if="events.error" class="error">{{ events.error }}</p>
      <div class="table-scroll">
        <table>
          <caption>
            Past events:
          </caption>
          <thead>
            <tr>
              <th>Type</th>
              <th>Details</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="event in events.events" :key="event.uuid">
              <td>{{ formatEventType(event.event_type) }}</td>
              <td>{{ event.metadata }}</td>
              <td>{{ formatDate(event.timestamp) }}</td>
            </tr>
            <tr v-if="events.events.length === 0">
              <td colspan="3">No events found.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="eventTotalPages > 1" class="pagination">
        <span class="pagination__label pagination__label--wide">
          {{ events.page }} | {{ eventTotalPages }}
        </span>
        <span class="pagination__label pagination__label--narrow">
          {{ events.page }} | {{ eventTotalPages }}
        </span>
        <TheButton
          type="button"
          :disabled="events.page <= 1"
          @click="changeEventPage(events.page - 1)"
        >
          Previous
        </TheButton>
        <TheButton
          type="button"
          :disabled="events.page >= eventTotalPages"
          @click="changeEventPage(events.page + 1)"
        >
          Next
        </TheButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import InputLine from '../components/InputLine.vue'
import TheButton from '../components/TheButton.vue'
import type { UpdateUserRequest } from '@/api/types'
import { useAuthStore } from '@/stores/authStore'
import { useEventStore } from '@/stores/eventsStore'
import { useNotificationStore } from '@/stores/notificationStore'

const auth = useAuthStore()
const events = useEventStore()
const notifications = useNotificationStore()

const username = ref(auth.user?.username ?? '')
const password = ref('')
const saving = ref(false)
const loadError = ref<string | null>(null)

const eventTotalPages = computed(() => Math.max(1, Math.ceil(events.total / events.limit)))

onMounted(async () => {
  try {
    if (!auth.user) {
      await auth.fetchUser()
    }
    if (auth.user) {
      username.value = auth.user.username
    }
  } catch (error) {
    loadError.value = error instanceof Error ? error.message : 'Could not load your user.'
  }

  events.fetchEvents({ page: 1, limit: 5 }).catch(() => null)
})

async function submitForm() {
  if (saving.value) return

  const payload: UpdateUserRequest = {}
  const trimmedUsername = username.value.trim()

  if (trimmedUsername && trimmedUsername !== auth.user?.username) {
    payload.username = trimmedUsername
  }

  if (password.value) {
    if (password.value.length < 8) {
      notifications.show('Password must be at least 8 characters.', 'error')
      return
    }
    payload.password = password.value
  }

  if (!payload.username && !payload.password) {
    notifications.show('Nothing to update.', 'info')
    return
  }

  saving.value = true
  try {
    const updated = await auth.updateUser(payload)
    username.value = updated.username
    password.value = ''
    notifications.show('User updated.', 'success')
  } catch (error) {
    notifications.show(
      error instanceof Error ? error.message : 'Could not update your user.',
      'error'
    )
  } finally {
    saving.value = false
  }
}

function changeEventPage(page: number) {
  events.fetchEvents({ page }).catch(() => null)
}

function formatEventType(type: string) {
  return type.replace(/([a-z])([A-Z])/g, '$1 $2')
}

function formatDate(timestamp: string) {
  const date = new Date(timestamp)
  return Number.isNaN(date.getTime()) ? timestamp : date.toLocaleString()
}
</script>

<style lang="scss">
.user-view {
  margin: 30px 0;
  display: grid;
  grid-template-columns: 10% 80% 10%;

  @include media('>tablet', '<desktop') {
    grid-template-columns: 15% 70% 15%;
  }

  @include media('>desktop') {
    grid-template-columns: 30% 40% 30%;
  }

  .block {
    min-width: 0;
    grid-column-start: 2;
    grid-column-end: 3;
  }

  .error {
    color: #e74c3c;
  }

  .actions {
    margin-top: 25px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }

  .hint {
    text-align: center;
    font-size: 16px;
    margin: 0;
  }

  .table-scroll {
    max-width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  table {
    margin-top: 50px;
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;

    th,
    td {
      text-align: left;
      padding: 5px;
      border-bottom: 1px solid #555;
      overflow-wrap: anywhere;
    }
  }

  .pagination {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    margin-top: 20px;

    .button {
      width: 100%;
      margin-top: 0;
    }

    &__label {
      order: -1;
      text-align: center;
    }

    &__label--wide {
      display: none;
    }

    @include media('>desktop') {
      flex-direction: row;
      align-items: center;
      justify-content: center;

      &__label {
        order: 0;
      }

      &__label--narrow {
        display: none;
      }

      &__label--wide {
        display: inline;
      }

      .button {
        width: 124px;
      }
    }
  }
}
</style>
