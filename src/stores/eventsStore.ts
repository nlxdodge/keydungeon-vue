import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apiRequest } from '@/api/client'
import type { PaginatedEvents } from '@/api/types'
import type { Event } from '@/stores/models/Event'

const PAGE_SIZE = 10

function toMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Something went wrong'
}

export const useEventStore = defineStore('events', () => {
  const events = ref<Event[]>([])
  const page = ref(1)
  const limit = ref(PAGE_SIZE)
  const total = ref(0)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchEvents(options: { page?: number; limit?: number } = {}) {
    if (options.page !== undefined) page.value = options.page
    if (options.limit !== undefined) limit.value = options.limit

    loading.value = true
    error.value = null

    try {
      const response = await apiRequest<PaginatedEvents>('/events', {
        query: { page: page.value, limit: limit.value }
      })
      events.value = response.data
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

  return { events, page, limit, total, loading, error, fetchEvents }
})
