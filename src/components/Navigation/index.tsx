import { Link } from 'react-router-dom'
import { User } from 'firebase/auth'

const Navigation = ({ currentUser }: { currentUser: User | null }) => {
  return (
    <nav style={{ border: '2px solid gray', position: 'sticky', top: 0 }}>
      <ul style={{ display: 'flex', gap: '20px' }}>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='profile'>{`${currentUser?.displayName}의 Profile`}</Link>
        </li>
        <li>
          <Link to='auth'>회원가입/로그인</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
