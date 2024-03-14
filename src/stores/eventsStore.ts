import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Event } from './models/Event'

export const passwordStore = defineStore('events', () => {
  const events = ref([] as Event[])
  function getById(id: number) {
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
  return { events, get, getById, post, patch }
})
