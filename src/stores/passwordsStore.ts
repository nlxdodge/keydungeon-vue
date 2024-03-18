import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Password } from './models/Password'

export const passwordStore = defineStore('passwords', () => {
  const passwords = ref([] as Password[])
  function getById(id: number) {
    return passwords.value.find((p: Password) => p.id == id)
  }
  function get() {
    return passwords.value
  }
  function post(newPasswords: Password[]) {
    passwords.value = newPasswords
  }
  function patch(newPassword: Password) {
    const tempPasswords = passwords.value.filter((p: Password) => p.id != newPassword.id)
    tempPasswords.push(newPassword)
    passwords.value = tempPasswords
  }

  // TEST DATA
  post([
    {
      id: 1,
      url: 'https://google.com',
      name: 'Google',
      username: 'email',
      password: 'password'
    },
    {
      id: 2,
      url: 'https://firefox.com',
      name: 'Firefox',
      username: 'email',
      password: 'password'
    }
  ])
  return { get, getById, post, patch }
})
