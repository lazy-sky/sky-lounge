import { Routes, Route } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { QueryClientProvider, QueryClient } from 'react-query'
import { useMount } from 'react-use'
import { onAuthStateChanged } from 'firebase/auth'
import { cloneDeep } from 'lodash'

import { auth } from 'myFirebase'
import { currentUserState, isLoggedInState } from 'store/atom'
import Navigation from 'components/Navigation'
import Profile from './Profile'
import CreatePost from './CreatePost'
import PrivateRoute from './PrivateRoute'
import Home from './Home'

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
  // - 프로젝트 자랑방:
  // - 모임 공지, 스터디 등
  // - 건의사항:
  // - 테스트
  // - 챌린지 및 인증

  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='profile' element={<Profile />} />
        <Route
          path='/write/*'
          element={
            <PrivateRoute>
              <CreatePost />
            </PrivateRoute>
          }
        />
      </Routes>
    </QueryClientProvider>
  )
}

export default App
