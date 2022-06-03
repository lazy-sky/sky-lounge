import { MouseEvent, useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { GithubAuthProvider, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'
import { cloneDeep } from 'lodash'

import { auth } from 'services/myFirebase'
import { currentUserState, isLoggedInState } from 'store/atom'
import PageHeader from 'components/_shared/PageHeader'
import { GithubIcon, GoogleIcon, MeerkatIcon } from 'assets/svgs'

import styles from './signIn.module.scss'

const SignIn = () => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState)
  const setCurrentUser = useSetRecoilState(currentUserState)

  useEffect(() => {
    if (isLoggedIn) {
      // TODO: 로그인 처리 중에 잠시 멈춰 있는 것처럼 보일 때 로딩 컴포넌트 띄우기
      navigate('/')
    }
  }, [isLoggedIn, navigate])

  const processSignIn = () => {
    setCurrentUser(cloneDeep(auth.currentUser))
    setIsLoggedIn(true)
  }

  const handleSocialLoginClick = async (event: MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event

    if (name === 'google') {
      await signInWithRedirect(auth, new GoogleAuthProvider())
      document.domain = 'example.com'
      processSignIn()
    }

    if (name === 'github') {
      await signInWithRedirect(auth, new GithubAuthProvider())
      processSignIn()
    }
  }

  return (
    <>
      <PageHeader title='로그인' />
      <div className={styles.logo}>
        <MeerkatIcon />
      </div>
      <div className={styles.socialBtns}>
        <button type='button' name='google' onClick={handleSocialLoginClick}>
          <GoogleIcon />
          Google로 로그인
        </button>
        <button type='button' name='github' onClick={handleSocialLoginClick}>
          <GithubIcon />
          Github로 로그인
        </button>
      </div>
    </>
  )
}

export default SignIn
