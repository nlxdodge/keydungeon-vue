import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from './models/User'

export const passwordStore = defineStore('user', () => {
  const user = ref({} as User)
  function get() {
    return user.value
  }
  function post(newUser: User) {
    user.value = newUser
  }
  function patch(newUser: User) {
    user.value = newUser
  }
  return { user, get, post, patch}
})
