import { ChatIcon, HomeIcon, PencilIcon, UserIcon } from 'assets/svgs'
import { Link, useLocation } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import cx from 'classnames'
import { isLoggedInState } from 'store/atom'

import styles from './navigation.module.scss'

const Navigation = () => {
  const location = useLocation()
  const { pathname } = location
  const isLoggedIn = useRecoilValue(isLoggedInState)

  const checkIsActive = (path: string) => {
    return path === pathname
  }

  return (
    <nav className={styles.navigation}>
      <ul>
        <li>
          <Link to='/' className={cx(checkIsActive('/') && styles.active)}>
            <HomeIcon />
          </Link>
        </li>
        <li>
          <Link to='write' className={cx(checkIsActive('/write') && styles.active)}>
            <PencilIcon />
          </Link>
        </li>
        <li>
          <Link to='chat' className={cx(checkIsActive('/chat') && styles.active)}>
            <ChatIcon />
          </Link>
        </li>
        <li>
          <Link to='profile' className={cx(checkIsActive('/profile') && styles.active)}>
            <UserIcon />
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
