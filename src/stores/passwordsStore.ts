import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apiRequest } from '@/api/client'
import type { PaginatedPasswords, PasswordRequest } from '@/api/types'
import type { Password } from '@/stores/models/Password'

const PAGE_SIZE = 20
const SEARCH_PAGE_SIZE = 100

function toMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Something went wrong'
}

function withoutSecret(entry: Password): Password {
  return { ...entry, password: '' }
}

export const usePasswordStore = defineStore('passwords', () => {
  const passwords = ref<Password[]>([])
  const page = ref(1)
  const limit = ref(PAGE_SIZE)
  const total = ref(0)
  const search = ref('')
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchPasswords(options: { page?: number; limit?: number; search?: string } = {}) {
    if (options.page !== undefined) page.value = options.page
    if (options.limit !== undefined) limit.value = options.limit
    if (options.search !== undefined) search.value = options.search

    loading.value = true
    error.value = null

    try {
      const response = await apiRequest<PaginatedPasswords>('/passwords', {
        query: {
          page: page.value,
          limit: limit.value,
          search: search.value || undefined
        }
      })

      passwords.value = response.data.map(withoutSecret)
      page.value = response.page
      limit.value = response.limit
      total.value = response.total
    } catch (caught) {
      error.value = toMessage(caught)
      throw caught
    } finally {
      loading.value = false
    }
  }

  async function ensureLoaded(uuid: string) {
    const cached = passwords.value.find((entry) => entry.uuid === uuid)
    if (cached) return cached

    let currentPage = 1
    while (currentPage > 0) {
      const response = await apiRequest<PaginatedPasswords>('/passwords', {
        query: { page: currentPage, limit: SEARCH_PAGE_SIZE }
      })
      const match = response.data.find((entry) => entry.uuid === uuid)
      if (match) return withoutSecret(match)
      if (currentPage * SEARCH_PAGE_SIZE >= response.total) break
      currentPage += 1
    }

    return null
  }

  async function revealPassword(uuid: string) {
    return apiRequest<string>(`/passwords/${uuid}`)
  }

  async function createPassword(payload: PasswordRequest) {
    const created = await apiRequest<Password>('/passwords', {
      method: 'POST',
      body: payload
    })
    await fetchPasswords({ page: 1 })
    return created
  }

  async function updatePassword(uuid: string, payload: PasswordRequest) {
    const updated = await apiRequest<Password>(`/passwords/${uuid}`, {
      method: 'PATCH',
      body: payload
    })
    await fetchPasswords()
    return updated
  }

  async function deletePassword(uuid: string) {
    await apiRequest<void>(`/passwords/${uuid}`, { method: 'DELETE' })
    if (passwords.value.length === 1 && page.value > 1) {
      page.value -= 1
    }
    await fetchPasswords()
  }

  function getById(uuid: string) {
    return passwords.value.find((entry) => entry.uuid === uuid)
  }

  return {
    passwords,
    page,
    limit,
    total,
    search,
    loading,
    error,
    fetchPasswords,
    ensureLoaded,
    revealPassword,
    createPassword,
    updatePassword,
    deletePassword,
    getById
  }
})
