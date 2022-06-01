import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { isLoggedInState } from 'store/atom'

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const isLoggedIn = useRecoilValue(isLoggedInState)
  return (
    <>
      {isLoggedIn || alert('로그인이 필요합니다.')}
      {isLoggedIn ? children : <Navigate to='/mypage' />}
    </>
  )
}

export default PrivateRoute
