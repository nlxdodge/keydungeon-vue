import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { mixins } from './mixins'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mixin(mixins)

// when going to a new page use v-focus to auto focus this element
app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})

app.mount('#app')
