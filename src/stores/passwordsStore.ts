import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Password } from './models/Password'

export const passwordStore = defineStore('passwords', () => {
  const passwords = ref([] as Password[])
  function getById(id: string) {
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
      id: '725fb528-e6ec-421d-8461-6bf1081cd1f9',
      url: 'https://google.com',
      name: 'Google',
      username: 'email',
      password: 'password'
    },
    {
      id: '2a3a1c52-5c22-4c1b-ac11-293682fc7852',
      url: 'https://firefox.com',
      name: 'Firefox',
      username: 'email',
      password: 'password'
    }
  ])
  return { get, getById, post, patch }
})
