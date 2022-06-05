import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut, updateProfile, User } from 'firebase/auth'
import { auth } from './myFirebase'

export const logInWithOAuth = async (providerName: string) => {
  if (providerName === 'google') {
    await signInWithPopup(auth, new GoogleAuthProvider())
  }

  if (providerName === 'github') {
    await signInWithPopup(auth, new GithubAuthProvider())
  }
}

export const logOut = () => {
  signOut(auth)
}

export const updateNickname = async (newName: string) => {
  await updateProfile(auth.currentUser as User, {
    displayName: newName,
  })
}
