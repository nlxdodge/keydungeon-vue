import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '../views/SignIn'

const routes = [
  {
    path: '/',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User.vue')
  },
  {
    path: "/:catchAll(.*)",
    name: '404',
    component: () => import('../views/404.vue')
  }
]

const router = createRouter({ 
  history: createWebHistory(),
  routes
})

export default router
