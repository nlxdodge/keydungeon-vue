import { Password } from './Password'
import { User } from './User'

export interface State {
    user: User,
    passwords: Password[]
}
