import { Routes, Route } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { QueryClientProvider, QueryClient } from 'react-query'
import { useMount } from 'react-use'
import { onAuthStateChanged } from 'firebase/auth'
import { cloneDeep } from 'lodash'

import { auth } from 'myFirebase'
import { currentUserState, isLoggedInState } from 'store/atom'
import Navigation from 'components/_shared/Navigation'
import MyPage from './MyPage'
import CreatePost from './CreatePost'
import PrivateRoute from './PrivateRoute'
import Home from './Home'

import styles from './routes.module.scss'
import ChatRoom from './ChatRoom'

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
  // - Home: 게시글 피드
  // - ChatRoom: 전체 채팅방
  // - CreatePost: 글쓰기
  // - Plaza: 만남의 광장(스터디 모집 등)
  //  - 스터디
  //  - 프로젝트
  //  - 구인
  //  - 기타
  // - Profile: 유저(회원가입, 로그인 및 프로필 변경)
  // Copyright 및 Maker

  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.container}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='mypage' element={<MyPage />} />
          <Route
            path='/write/*'
            element={
              <PrivateRoute>
                <CreatePost />
              </PrivateRoute>
            }
          />
          <Route path='chat' element={<ChatRoom />} />
        </Routes>
      </div>
      <footer>
        <Navigation />
      </footer>
    </QueryClientProvider>
  )
}

export default App
