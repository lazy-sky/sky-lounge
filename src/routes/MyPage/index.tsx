import { useState, ChangeEvent, FormEvent, MouseEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut, updateProfile, User } from 'firebase/auth'
import { cloneDeep } from 'lodash'

import { auth } from 'myFirebase'
import { currentUserState, isLoggedInState } from 'store/atom'
import PageHeader from 'components/_shared/PageHeader'

const Profile = () => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState)
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState)
  // TODO: 랜덤 닉네임 생성
  const [newDisplayName, setNewDisplayname] = useState(currentUser?.displayName || '')

  useEffect(() => {
    setNewDisplayname(currentUser?.displayName || '')
  }, [currentUser])

  const handleSocialLoginClick = async (event: MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event

    if (name === 'google') {
      await signInWithPopup(auth, new GoogleAuthProvider())
    }

    if (name === 'github') {
      await signInWithPopup(auth, new GithubAuthProvider())
    }

    setCurrentUser(cloneDeep(auth.currentUser))
  }

  const handleDisplayNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewDisplayname(event.target.value)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (currentUser?.displayName === newDisplayName) return

    await updateProfile(auth.currentUser as User, {
      displayName: newDisplayName,
    })

    setCurrentUser(cloneDeep(auth.currentUser))
  }

  const handleLogOutClick = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
    signOut(auth)
    navigate('/')
  }

  return (
    <div>
      <PageHeader title='마이 프로필' />
      {isLoggedIn ? (
        <>
          <img src={String(currentUser?.photoURL)} alt='user profile' />
          <form onSubmit={handleSubmit}>
            닉네임:
            <input
              type='text'
              placeholder='닉네임을 입력해주세요'
              value={newDisplayName}
              onChange={handleDisplayNameChange}
            />
            <button type='submit'>변경</button>
          </form>
          <button type='button' onClick={handleLogOutClick}>
            Log Out
          </button>
        </>
      ) : (
        <div style={{ display: 'flex', gap: '20px' }}>
          <button type='button' name='google' onClick={handleSocialLoginClick}>
            Continue with Google
          </button>
          <button type='button' name='github' onClick={handleSocialLoginClick}>
            Continue with Github
          </button>
        </div>
      )}
    </div>
  )
}

export default Profile
