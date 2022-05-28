import { MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from 'firebase/auth'

import { auth } from 'myFirebase'

const Auth = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const navigate = useNavigate()

  const handleSocialClick = async (event: MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event

    if (name === 'google') {
      await signInWithPopup(auth, new GoogleAuthProvider())
      return
    }

    if (name === 'github') {
      await signInWithPopup(auth, new GithubAuthProvider())
    }
  }

  const handleLogOutClick = () => {
    signOut(auth)
    navigate('/')
  }

  return (
    <div>
      {isLoggedIn ? (
        <button type='button' onClick={handleLogOutClick}>
          Log Out
        </button>
      ) : (
        <div>
          <button type='button' name='google' onClick={handleSocialClick}>
            Continue with Google
          </button>
          <button type='button' name='github' onClick={handleSocialClick}>
            Continue with Github
          </button>
        </div>
      )}
    </div>
  )
}

export default Auth
