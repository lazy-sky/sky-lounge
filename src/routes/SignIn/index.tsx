import { MouseEvent, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { Navigate } from 'react-router-dom'
import { cloneDeep } from 'lodash'
import Swal from 'sweetalert2'

import { auth } from 'services/myFirebase'
import { currentUserState, isLoggedInState } from 'store/atom'
import { logInWithOAuth } from 'services/auth'
import PageHeader from 'components/_shared/PageHeader'
import Loading from 'components/_shared/Loading'
import { GithubIcon, GoogleIcon, MeerkatIcon } from 'assets/svgs'

import styles from './signIn.module.scss'

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState)
  const setCurrentUser = useSetRecoilState(currentUserState)

  // TODO: iframe CORS 해결
  // memo: 다른 origin을 가진 iframe DOM 트리에 접근하는 경우라 원칙적으로 에러 로그가 뜨는 게 맞다.
  // 이 경우는 OAuth를 이용할 뿐 DOM을 조작하려는 것은 아니기 때문에 콘솔에 에러가 뜨는 것을 제외하면 따로 문제되는 것은 없다.
  // 따라서 해결 후순위로 두자.
  // popup 방식 대신 redirect로 로그인하게 하면 해결되지만 편의상 팝업이 더 좋다는 판단.
  const handleSocialLoginClick = async (event: MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event

    setIsLoading(true)

    try {
      await logInWithOAuth(name)
      setCurrentUser(cloneDeep(auth.currentUser))
      setIsLoggedIn(true)
    } catch (error) {
      Swal.fire('로그인에 실패하셨습니다.')
      return
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoggedIn) {
    return <Navigate to='/mypage' />
  }

  return (
    <>
      <PageHeader title='로그인' />
      {isLoading && <Loading type='spinningBubbles' />}
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
