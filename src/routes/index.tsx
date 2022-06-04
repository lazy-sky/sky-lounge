import { Routes, Route } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { useMount } from 'react-use'
import { onAuthStateChanged } from 'firebase/auth'
import { cloneDeep } from 'lodash'

import { auth } from 'services/myFirebase'
import { currentUserState, isLoggedInState } from 'store/atom'
import Navigation from 'components/_shared/Navigation'
import MyPage from './MyPage'
import CreatePost from './CreatePost'
import PrivateRoute from './PrivateRoute'
import Home from './Home'

import styles from './routes.module.scss'
import ChatRoom from './ChatRoom'
import SignIn from './SignIn'

const App = () => {
  const setIsLoggedIn = useSetRecoilState(isLoggedInState)
  const setCurrentUser = useSetRecoilState(currentUserState)

  useMount(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) return

      setIsLoggedIn(true)
      setCurrentUser(cloneDeep(auth.currentUser))
    })
  })

  return (
    <>
      <div className={styles.container}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='signin' element={<SignIn />} />
          <Route
            path='/write/*'
            element={
              <PrivateRoute>
                <CreatePost />
              </PrivateRoute>
            }
          />
          <Route
            path='/mypage'
            element={
              <PrivateRoute>
                <MyPage />
              </PrivateRoute>
            }
          />
          <Route path='chat' element={<ChatRoom />} />
        </Routes>
      </div>
      <footer>
        <Navigation />
      </footer>
    </>
  )
}

export default App
