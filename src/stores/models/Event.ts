import type { EventType } from "./EventType";

export interface Event {
    id: string,
    eventType: EventType,
    metadata: string
}