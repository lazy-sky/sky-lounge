import { signOut, updateProfile, User } from 'firebase/auth'
import { auth } from './myFirebase'

export const updateNickname = async (newName: string) => {
  await updateProfile(auth.currentUser as User, {
    displayName: newName,
  })
}

export const logOut = () => {
  signOut(auth)
}
