import type { EventType } from './EventType'

export interface Event {
  uuid: string
  user_uuid: string
  event_type: EventType
  metadata: string
  timestamp: string
}
