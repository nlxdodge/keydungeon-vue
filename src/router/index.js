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
    path: '/passwords',
    name: 'Passwords',
    component: () => import('../views/passwords/PasswordView.vue')
  },
  {
    path: '/passwords/add',
    name: 'Add Password',
    component: () => import('../views/passwords/PasswordMutate.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User.vue')
  },
  {
    path: "/:catchAll(.*)",
    name: 'Error',
    component: () => import('../views/Error.vue')
  }
]

const router = createRouter({ 
  history: createWebHistory(),
  routes
})

export default router
