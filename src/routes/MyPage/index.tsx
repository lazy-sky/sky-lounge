import { useState, ChangeEvent, FormEvent } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { useMount } from 'react-use'
import { deleteUser, User } from 'firebase/auth'
import { cloneDeep } from 'lodash'
import Swal from 'sweetalert2'
import cx from 'classnames'

import { auth } from 'services/myFirebase'
import { logOut, updateNickname } from 'services/auth'
import { setMyDataInRealTime } from 'services/data'
import { IComment, IPost } from 'types/post'
import { currentUserState, isLoggedInState } from 'store/atom'
import { getRandomNickname } from '../../utils'
import PageHeader from 'components/_shared/PageHeader'
import PostList from 'components/PostList'
import CommentList from 'components/CommentList'

import styles from './myPage.module.scss'

const MyPage = () => {
  const navigate = useNavigate()
  const setIsLoggedIn = useSetRecoilState(isLoggedInState)
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState)
  const [newDisplayName, setNewDisplayname] = useState(currentUser?.displayName || '')
  const [myPosts, setMyPosts] = useState<IPost[]>([])
  const [myComments, setMyComments] = useState<IComment[]>([])
  const [postsView, setPostsView] = useState(false)
  const [commentsView, setCommentsView] = useState(false)

  useMount(() => {
    setNewDisplayname(currentUser?.displayName || '')
    setMyDataInRealTime('posts', setMyPosts, currentUser!.uid)
    setMyDataInRealTime('comments', setMyComments, currentUser!.uid)
  })

  const handleDisplayNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewDisplayname(event.target.value)
  }

  const handleRandomNicknameClick = () => {
    setNewDisplayname(getRandomNickname())
  }

  const handleMyPostsClick = () => {
    setPostsView((prev) => !prev)
    setCommentsView(false)
  }

  const handleMyCommentsClick = () => {
    setCommentsView((prev) => !prev)
    setPostsView(false)
  }

  const handleNewNameSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (currentUser?.displayName === newDisplayName) return

    updateNickname(newDisplayName)
    setCurrentUser(cloneDeep(auth.currentUser))
  }

  const handleLogOutClick = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
    logOut()
    Swal.fire('??????????????? ???????????? ???????????????.')
    navigate('/')
  }

  const handleWithdrawlClick = () => {
    deleteUser(auth.currentUser as User)
      .then(() => {
        setIsLoggedIn(false)
        setCurrentUser(null)
      })
      .then(() => {
        Swal.fire('??????????????? ?????? ?????????????????????.')
        navigate('/')
      })
  }

  return (
    <>
      <PageHeader title='?????? ?????????' />
      <div className={styles.profileImage}>
        <img src={String(currentUser?.photoURL)} alt='user profile' />
      </div>
      <form onSubmit={handleNewNameSubmit} className={styles.displayName}>
        <input
          type='text'
          placeholder='???????????? ??????????????????'
          value={newDisplayName}
          onChange={handleDisplayNameChange}
        />
        <button type='button' onClick={handleRandomNicknameClick}>
          ?????? ????????? ??????
        </button>
        {currentUser?.displayName !== newDisplayName && <button type='submit'>??????</button>}
      </form>
      <div className={styles.myWritings}>
        <dl>
          <button type='button' onClick={handleMyPostsClick} className={cx(postsView && styles.active)}>
            <dt>?????? ??? ???</dt>
            <dd>{myPosts?.length || 0}</dd>
          </button>
          <button type='button' onClick={handleMyCommentsClick} className={cx(commentsView && styles.active)}>
            <dt>?????? ??? ??????</dt>
            <dd>{myComments?.length || 0}</dd>
          </button>
        </dl>
        <div>
          {postsView && <PostList posts={myPosts} />}
          {commentsView && <CommentList comments={myComments} />}
        </div>
      </div>
      <div className={styles.editInfo}>
        <h4>??? ?????? ??????</h4>
        <ul>
          <li>
            <div>????????????</div>
            <div>{currentUser?.email}</div>
          </li>
          <li>
            <button type='button' onClick={handleLogOutClick}>
              ????????????
            </button>
          </li>
          <li>
            <button type='button' onClick={handleWithdrawlClick}>
              ?????? ??????
            </button>
          </li>
        </ul>
      </div>
    </>
  )
}

export default MyPage
