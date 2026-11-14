<template>
  <div class="password-line">
    <a :href="props.password.url">
      <p>{{ props.password.name }}</p>
    </a>
    <p>{{ props.password.username }}</p>
    <div class="actions">
      <TheButton :href="'/passwords/edit/' + props.password.uuid">Edit</TheButton>
      <TheButton type="button" :disabled="copying" @click="copy">
        {{ copying ? 'Copying…' : 'Copy' }}
      </TheButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TheButton from '../components/TheButton.vue'
import type { Password } from '../stores/models/Password'
import { usePasswordStore } from '@/stores/passwordsStore'
import { useNotificationStore } from '@/stores/notificationStore'

interface Props {
  password: Password
}
const props = defineProps<Props>()

const store = usePasswordStore()
const notifications = useNotificationStore()
const copying = ref(false)

async function copy() {
  copying.value = true
  try {
    const secret = await store.revealPassword(props.password.uuid)
    await navigator.clipboard.writeText(secret)
    notifications.show('Password copied to clipboard.', 'success')
  } catch (error) {
    notifications.show(
      error instanceof Error ? error.message : 'Could not copy the password.',
      'error'
    )
  } finally {
    copying.value = false
  }
}
</script>

<style lang="scss">
.password-line {
  padding: 10px;
  border: 1px dashed black;

  .button {
    width: 100%;
  }

  .actions {
    @include media('>desktop') {
      display: flex;
      gap: 10px;

      .button {
        flex: 1;
        width: auto;
      }
    }
  }

  p {
    margin: 0 0 10px 0;
    word-wrap: break-word;
  }
}
</style>
