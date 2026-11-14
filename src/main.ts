import { createApp } from 'vue'

import 'normalize.css'
import '@/assets/scss/defaults.scss'

import App from './App.vue'
import router from './router'
import { pinia } from './pinia'
import { setUnauthorizedHandler } from './api/client'
import { useAuthStore } from './stores/authStore'

const app = createApp(App)

app.use(pinia)

const auth = useAuthStore(pinia)
auth.init()

setUnauthorizedHandler(() => {
  auth.logout()
  if (router.currentRoute.value.path !== '/') {
    router.push('/')
  }
})

app.use(router)

// when going to a new page use v-focus to auto focus this element
app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})

app.mount('#app')
