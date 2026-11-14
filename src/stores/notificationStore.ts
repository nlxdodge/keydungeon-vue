import { ref } from 'vue'
import { defineStore } from 'pinia'

export type NotificationType = 'success' | 'error' | 'info'

export const useNotificationStore = defineStore('notification', () => {
  const message = ref('')
  const type = ref<NotificationType>('info')
  const visible = ref(false)

  let timer: ReturnType<typeof setTimeout> | null = null

  function show(newMessage: string, newType: NotificationType = 'info') {
    message.value = newMessage
    type.value = newType
    visible.value = true

    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      visible.value = false
      timer = null
    }, 3000)
  }

  function hide() {
    visible.value = false
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  return { message, type, visible, show, hide }
})
