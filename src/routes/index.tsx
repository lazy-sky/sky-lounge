import { Routes, Route } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { QueryClientProvider, QueryClient } from 'react-query'
import { useMount } from 'react-use'
import { onAuthStateChanged } from 'firebase/auth'
import { cloneDeep } from 'lodash'

import { auth } from 'myFirebase'
import { currentUserState, isLoggedInState } from 'store/atom'
import Navigation from 'components/Navigation'
import Auth from './Auth'
import PostsFeed from './PostsFeed'
import Profile from './Profile'

const App = () => {
  const queryClient = new QueryClient()
  const setIsLoggedIn = useSetRecoilState(isLoggedInState)
  const setCurrentUser = useSetRecoilState(currentUserState)

  useMount(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) return

      setIsLoggedIn(true)
      setCurrentUser(cloneDeep(auth.currentUser))
    })
  })

  // TODO: route
  // - 자유 포스트방:
  // - 프로젝트 자랑방:
  // - 모임 공지, 스터디 등
  // - 건의사항:
  // - 테스트
  // - 회원가입 및 로그인

  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
      <Routes>
        <Route path='/' element={<PostsFeed />} />
        <Route path='auth' element={<Auth />} />
        <Route path='profile' element={<Profile />} />
      </Routes>
    </QueryClientProvider>
  )
}

export default App
