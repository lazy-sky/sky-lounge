import { GithubAuthProvider, GoogleAuthProvider, signInWithRedirect, signOut, updateProfile, User } from 'firebase/auth'
import { auth } from './myFirebase'

export const logInWithOAuth = async (providerName: string) => {
  if (providerName === 'google') {
    await signInWithRedirect(auth, new GoogleAuthProvider())
    return
  }

  if (providerName === 'github') {
    await signInWithRedirect(auth, new GithubAuthProvider())
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
