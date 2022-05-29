import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { currentUserState } from 'store/atom'

const Navigation = () => {
  const currentUser = useRecoilValue(currentUserState)

  return (
    <nav style={{ border: '2px solid gray', position: 'sticky', top: 0 }}>
      <ul style={{ display: 'flex', gap: '20px' }}>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='profile'>
            <img src={String(currentUser?.photoURL)} alt='profile' width='50' />
          </Link>
        </li>
        <li>
          <Link to='write'>새 글 작성</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
