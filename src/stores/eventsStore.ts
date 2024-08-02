import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Event } from './models/Event'
import { EventType } from './models/EventType'

export const eventStore = defineStore('events', () => {
  const events = ref([] as Event[])
  function getById(id: string) {
    return events.value.find((p: Event) => p.id == id)
  }
  function get() {
    return events.value
  }
  function post(newEvents: Event[]) {
    events.value = newEvents
  }
  function patch(newEvents: Event) {
    const tempEvents = events.value.filter((p: Event) => p.id != newEvents.id)
    tempEvents.push(newEvents)
    events.value = tempEvents
  }

  post([
    {
      id: "1",
      eventType: EventType.login,
      metadata: '{"ip_address":"123.123.123.123", "date":"today"}'
    },
    {
      id: "2",
      eventType: EventType.login_attempt,
      metadata: '{"ip_address":"123.123.123.124", "date":"today"}'
    }
  ])

  return { events, get, getById, post, patch }
})
