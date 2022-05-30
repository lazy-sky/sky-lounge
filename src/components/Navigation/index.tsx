import { ChatIcon, HomeIcon, PencilIcon, UserIcon } from 'assets/svgs'
import { Link } from 'react-router-dom'

import styles from './navigation.module.scss'

const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <ul>
        <li>
          <Link to='/'>
            <HomeIcon />
          </Link>
        </li>
        <li>
          <Link to='write'>
            <PencilIcon />
          </Link>
        </li>
        <li>
          <Link to='chat'>
            <ChatIcon />
          </Link>
        </li>
        <li>
          <Link to='profile'>
            <UserIcon />
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
