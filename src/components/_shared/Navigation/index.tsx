import { Link, useLocation } from 'react-router-dom'
import cx from 'classnames'

import { HomeIcon, PencilIcon, UserIcon } from 'assets/svgs'

import styles from './navigation.module.scss'

const Navigation = () => {
  const location = useLocation()
  const { pathname } = location

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
          <Link to='mypage' className={cx(checkIsActive('/mypage') && styles.active)}>
            <UserIcon />
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
