import { useState, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { signOut, updateProfile, User } from 'firebase/auth'
import { cloneDeep } from 'lodash'

import { auth } from 'myFirebase'
import { currentUserState } from 'store/atom'

const Profile = () => {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState)
  const [newDisplayName, setNewDisplayname] = useState(currentUser?.displayName)

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
    signOut(auth)
    navigate('/')
  }

  return (
    <div>
      <img src={String(currentUser?.photoURL)} alt='user profile' />
      <form onSubmit={handleSubmit}>
        닉네임:
        <input
          type='text'
          placeholder='닉네임을 입력해주세요'
          value={newDisplayName || ''}
          onChange={handleDisplayNameChange}
        />
        <button type='submit'>변경</button>
      </form>
      <button type='button' onClick={handleLogOutClick}>
        로그아웃
      </button>
    </div>
  )
}

export default Profile
