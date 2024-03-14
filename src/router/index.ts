import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '../views/SignIn.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Sign-In to your account',
      component: SignIn
    },
    {
      path: '/sign-up',
      name: 'Sign-Up for an account',
      component: () => import('../views/SignUp.vue')
    },
    {
      path: '/passwords',
      name: 'All your Passwords',
      component: () => import('../views/passwords/PasswordView.vue')
    },
    {
      path: '/passwords/add',
      name: 'Add a new Password',
      component: () => import('../views/passwords/PasswordMutate.vue')
    },
    {
      path: '/user',
      name: 'Your user information',
      component: () => import('../views/UserView.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'Error page not found',
      component: () => import('../views/ErrorView.vue')
    }
  ]
})

export default router
