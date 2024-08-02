import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from './models/User'



export const userStore = defineStore('user', () => {
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

  // TEST DATA
  post(
    {
      id: 'ab28b491-e717-42c0-b370-a0edf057e4f2',
      email: 'nlxdodge@gmail.com',
      password: 'SomePassword1234!'
    }
  )
  return { user, get, post, patch }
})
