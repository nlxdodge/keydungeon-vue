import { createRouter, createWebHistory } from 'vue-router'
import { pinia } from '@/pinia'
import { useAuthStore } from '@/stores/authStore'
import SignIn from '../views/SignIn.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Sign in to your account',
      component: SignIn
    },
    {
      path: '/sign-up',
      name: 'Sign up for an account',
      component: () => import('../views/SignUp.vue')
    },
    {
      path: '/passwords',
      name: 'All your Passwords',
      component: () => import('../views/passwords/PasswordsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/passwords/add',
      name: 'Add a new Password',
      component: () => import('../views/passwords/PasswordMutate.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/passwords/edit/:uuid',
      name: 'Edit a Password',
      component: () => import('../views/passwords/PasswordMutate.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/user',
      name: 'Your user information',
      component: () => import('../views/UserView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/:catchAll(.*)',
      name: 'Error page not found',
      component: () => import('../views/ErrorView.vue')
    }
  ]
})

router.beforeEach((to) => {
  const auth = useAuthStore(pinia)

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { path: '/', query: { redirect: to.fullPath } }
  }

  if ((to.path === '/' || to.path === '/sign-up') && auth.isAuthenticated) {
    return { path: '/passwords' }
  }

  return true
})

export default router
