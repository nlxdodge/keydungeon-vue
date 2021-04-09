import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User.vue')
  }
]

const router = createRouter({ 
  history: createWebHistory(),
  routes
})

export default router
