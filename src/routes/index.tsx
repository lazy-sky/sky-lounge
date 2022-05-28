import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { QueryClientProvider, QueryClient } from 'react-query'
import { onAuthStateChanged, User } from 'firebase/auth'
import { cloneDeep } from 'lodash'

import { auth } from 'myFirebase'
import Navigation from 'components/Navigation'
import Auth from './Auth'
import PostsFeed from './PostsFeed'
import Profile from './Profile'

const App = () => {
  const queryClient = new QueryClient()
  // TODO: 전역 상태로 변경
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setIsLoggedIn(false)
        return
      }

      setIsLoggedIn(true)
      setCurrentUser(cloneDeep(auth.currentUser))
    })
  }, [])

  // TODO: route
  // - 자유 포스트방:
  // - 프로젝트 자랑방:
  // - 모임 공지, 스터디 등
  // - 건의사항:
  // - 테스트
  // - 회원가입 및 로그인

  return (
    <>
      <Navigation currentUser={currentUser} />
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path='/' element={<PostsFeed />} />
            <Route path='auth' element={<Auth isLoggedIn={isLoggedIn} />} />
            <Route path='profile' element={<Profile currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          </Routes>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  )
}

export default App
