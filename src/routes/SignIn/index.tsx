import { MouseEvent } from 'react'
import { useSetRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { cloneDeep } from 'lodash'

import { auth } from 'services/myFirebase'
import { currentUserState, isLoggedInState } from 'store/atom'
import PageHeader from 'components/_shared/PageHeader'
import { GithubIcon, GoogleIcon } from 'assets/svgs'

import styles from './signIn.module.scss'

const SignIn = () => {
  const navigate = useNavigate()
  const setIsLoggedIn = useSetRecoilState(isLoggedInState)
  const setCurrentUser = useSetRecoilState(currentUserState)

  const processSignIn = () => {
    setCurrentUser(cloneDeep(auth.currentUser))
    setIsLoggedIn(true)
    navigate(-1)
  }

  const handleSocialLoginClick = async (event: MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event

    if (name === 'google') {
      await signInWithPopup(auth, new GoogleAuthProvider())
      processSignIn()
    }

    if (name === 'github') {
      await signInWithPopup(auth, new GithubAuthProvider())
      processSignIn()
    }
  }

  return (
    <>
      <PageHeader title='로그인' />
      <div className={styles.logo}>서비스 로고</div>
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
