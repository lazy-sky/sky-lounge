import { MouseEvent } from 'react'
import { useRecoilValue } from 'recoil'
import { Navigate } from 'react-router-dom'
import Swal from 'sweetalert2'

import { isLoggedInState } from 'store/atom'
import { logInWithOAuth } from 'services/auth'
import PageHeader from 'components/_shared/PageHeader'
import Loading from 'components/_shared/Loading'
import { GithubIcon, GoogleIcon, MeerkatIcon } from 'assets/svgs'

import styles from './signIn.module.scss'

const SignIn = () => {
  const isLoggedIn = useRecoilValue(isLoggedInState)

  const handleSocialLoginClick = async (event: MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event

    try {
      localStorage.setItem('isLoginLoading', 'true')
      await logInWithOAuth(name)
    } catch (error) {
      Swal.fire('로그인에 실패하셨습니다.')
    }
  }

  if (isLoggedIn) {
    return <Navigate to='/mypage' />
  }

  return (
    <>
      <PageHeader title='로그인' />
      {localStorage.getItem('isLoginLoading') && <Loading type='spinningBubbles' />}
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
