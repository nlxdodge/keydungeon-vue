import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// when going to a new page use v-focus to auto focus this element
app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})

app.mount('#app')
