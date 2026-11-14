export const EventTypes = [
  'SignIn',
  'SignOut',
  'CreatePassword',
  'ShowPasswords',
  'RevealPassword',
  'EditPassword',
  'DeletePassword',
  'CreateUser',
  'ShowUser',
  'EditUser',
  'DeleteUser'
] as const

export type EventType = (typeof EventTypes)[number]
