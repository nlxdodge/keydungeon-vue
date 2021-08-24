import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueClipboard3 from 'vue-clipboard3'

createApp(App).use(VueClipboard3).use(store).use(router).mount('#app')
