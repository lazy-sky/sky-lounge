import { User } from 'firebase/auth'
import { atom } from 'recoil'

export const isLoggedInState = atom({
  key: 'isLoggedInState',
  default: false,
})

export const currentUserState = atom<User | null>({
  key: 'currentUser',
  default: null,
})
