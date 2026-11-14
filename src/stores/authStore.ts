import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { apiRequest, setAuthToken } from '@/api/client'
import type { AuthResponse, Claims, UpdateUserRequest } from '@/api/types'
import type { User } from '@/stores/models/User'

const TOKEN_KEY = 'keydungeon.token'

interface StoredSession {
  token: string
  claims: Claims | null
}

function toMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Something went wrong'
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const claims = ref<Claims | null>(null)
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => {
    if (!token.value) return false
    if (claims.value && claims.value.exp * 1000 <= Date.now()) return false
    return true
  })

  function storeSession(newToken: string | null, newClaims: Claims | null) {
    token.value = newToken
    claims.value = newClaims
    setAuthToken(newToken)

    if (newToken) {
      const session: StoredSession = { token: newToken, claims: newClaims }
      sessionStorage.setItem(TOKEN_KEY, JSON.stringify(session))
    } else {
      sessionStorage.removeItem(TOKEN_KEY)
    }
  }

  function restore() {
    const raw = sessionStorage.getItem(TOKEN_KEY)
    if (!raw) return

    try {
      const session = JSON.parse(raw) as StoredSession
      if (!session.token || (session.claims && session.claims.exp * 1000 <= Date.now())) {
        storeSession(null, null)
        return
      }
      token.value = session.token
      claims.value = session.claims
      setAuthToken(session.token)
    } catch {
      storeSession(null, null)
    }
  }

  async function login(username: string, password: string) {
    loading.value = true
    error.value = null
    try {
      const response = await apiRequest<AuthResponse>('/auth/login', {
        method: 'POST',
        body: { username, password },
        skipAuth: true
      })
      storeSession(response.token, response.claims)
      await fetchUser().catch(() => null)
      return response
    } catch (caught) {
      error.value = toMessage(caught)
      throw caught
    } finally {
      loading.value = false
    }
  }

  async function register(username: string, password: string) {
    loading.value = true
    error.value = null
    try {
      const response = await apiRequest<AuthResponse>('/auth/register', {
        method: 'POST',
        body: { username, password },
        skipAuth: true
      })
      storeSession(response.token, response.claims)
      await fetchUser().catch(() => null)
      return response
    } catch (caught) {
      error.value = toMessage(caught)
      throw caught
    } finally {
      loading.value = false
    }
  }

  async function verify() {
    if (!token.value) return false
    try {
      const response = await apiRequest<AuthResponse>('/auth/verify', { method: 'POST' })
      storeSession(response.token, response.claims)
      return true
    } catch {
      logout()
      return false
    }
  }

  async function fetchUser() {
    if (!claims.value) return null
    const currentUser = await apiRequest<User>(`/users/${claims.value.sub}`)
    user.value = currentUser
    return currentUser
  }

  async function updateUser(payload: UpdateUserRequest) {
    if (!claims.value) {
      throw new Error('You are not authenticated.')
    }
    const updated = await apiRequest<User>(`/users/${claims.value.sub}`, {
      method: 'PATCH',
      body: payload
    })
    user.value = updated
    return updated
  }

  function logout() {
    storeSession(null, null)
    user.value = null
    error.value = null
  }

  function init() {
    restore()
  }

  return {
    token,
    claims,
    user,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    verify,
    fetchUser,
    updateUser,
    logout,
    init
  }
})
