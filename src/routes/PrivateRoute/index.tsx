import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import Swal from 'sweetalert2'

import { isLoggedInState } from 'store/atom'

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const isLoggedIn = useRecoilValue(isLoggedInState)

  if (!isLoggedIn) {
    Swal.fire('로그인이 필요합니다.')
    return <Navigate to='/mypage' />
  }

  return <div>{children}</div>
}

export default PrivateRoute
