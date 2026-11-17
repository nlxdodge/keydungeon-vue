<template>
  <div class="password-mutate">
    <div class="block">
      <h1>{{ editing ? 'Edit password' : 'Add password' }}</h1>
      <p v-if="loadError" class="error">{{ loadError }}</p>
      <form v-if="!loadError" @submit.prevent="submitForm">
        <InputLine name="url" v-model="form.url" autofocus />
        <InputLine name="name" v-model="form.name" />
        <InputLine name="username" v-model="form.username" autocomplete="off" />
        <InputLine
          name="password"
          type="password"
          v-model="form.password"
          autocomplete="off"
        />
        <div class="actions">
          <TheButton href="/passwords">Back</TheButton>
          <TheButton type="submit" :disabled="saving">
            {{ saving ? 'Saving…' : 'Save' }}
          </TheButton>
          <TheButton type="button" @click="generatePassword">Generate</TheButton>
          <TheButton v-if="editing" type="button" variant="danger" @click="showDelete = true">
            Delete
          </TheButton>
        </div>
      </form>
    </div>
    <ConfirmModal
      :show="showDelete"
      title="Delete password"
      :message="`Are you sure you want to delete ${form.name || 'this password'}?`"
      @confirm="deletePassword"
      @cancel="showDelete = false"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import InputLine from '@/components/InputLine.vue'
import TheButton from '@/components/TheButton.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'
import { generateRandomString } from '@/mixins'
import { newUuid } from '@/utils/uuid'
import { usePasswordStore } from '@/stores/passwordsStore'
import { useNotificationStore } from '@/stores/notificationStore'

const route = useRoute()
const router = useRouter()
const store = usePasswordStore()
const notifications = useNotificationStore()

const uuidParam = typeof route.params.uuid === 'string' ? route.params.uuid : ''
const editing = computed(() => uuidParam !== '')

const form = reactive({
  uuid: uuidParam || newUuid(),
  icon: '',
  url: '',
  name: '',
  username: '',
  password: ''
})

const saving = ref(false)
const showDelete = ref(false)
const loadError = ref<string | null>(null)

onMounted(async () => {
  if (!editing.value) return

  try {
    const password = await store.ensureLoaded(uuidParam)
    if (!password) {
      loadError.value = 'The requested password could not be found.'
      return
    }

    form.icon = password.icon
    form.url = password.url
    form.name = password.name
    form.username = password.username
    form.password = await store.revealPassword(uuidParam)
  } catch (error) {
    loadError.value = error instanceof Error ? error.message : 'Could not load the password.'
  }
})

function generatePassword() {
  form.password = generateRandomString()
}

async function submitForm() {
  if (!form.name || !form.username || !form.password) {
    notifications.show('Name, username and password are required.', 'error')
    return
  }

  saving.value = true
  try {
    const payload = { ...form }
    if (editing.value) {
      await store.updatePassword(form.uuid, payload)
      notifications.show('Password updated.', 'success')
    } else {
      await store.createPassword(payload)
      notifications.show('Password created.', 'success')
    }
    await router.push('/passwords')
  } catch (error) {
    notifications.show(
      error instanceof Error ? error.message : 'Could not save the password.',
      'error'
    )
  } finally {
    saving.value = false
  }
}

async function deletePassword() {
  showDelete.value = false
  try {
    await store.deletePassword(form.uuid)
    notifications.show('Password deleted.', 'success')
    await router.push('/passwords')
  } catch (error) {
    notifications.show(
      error instanceof Error ? error.message : 'Could not delete the password.',
      'error'
    )
  }
}
</script>

<style lang="scss">
.password-mutate {
  display: grid;
  grid-template-columns: 10% 80% 10%;

  @include media('>tablet', '<desktop') {
    grid-template-columns: 20% 60% 20%;
  }

  @include media('>desktop') {
    grid-template-columns: 35% 30% 35%;
  }

  .block {
    grid-column-start: 2;
    grid-column-end: 3;
  }

  .error {
    color: #e74c3c;
    text-align: center;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;

    .button {
      min-width: 125px;
      margin-top: 0;
    }
  }
}
</style>
