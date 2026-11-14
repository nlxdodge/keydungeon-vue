import type { Event } from '@/stores/models/Event'
import type { Password } from '@/stores/models/Password'
import type { User } from '@/stores/models/User'

export interface Paginated<T> {
  data: T[]
  page: number
  limit: number
  total: number
}

export type PaginatedPasswords = Paginated<Password>
export type PaginatedEvents = Paginated<Event>

export interface Claims {
  sub: string
  exp: number
  iat: number
}

export interface AuthResponse {
  token: string
  claims: Claims
}

export interface PasswordRequest {
  uuid: string
  icon: string
  url: string
  name: string
  username: string
  password: string
}

export interface UpdateUserRequest {
  username?: string
  password?: string
}

export type { User }
