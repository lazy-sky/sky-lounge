import { useState, ChangeEvent, FormEvent } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { signOut, updateProfile, User } from 'firebase/auth'
import { cloneDeep } from 'lodash'
import { useMount } from 'react-use'
import cx from 'classnames'

import { auth, myDb } from 'myFirebase'
import { IComment, IPost } from 'types/post'
import { currentUserState, isLoggedInState } from 'store/atom'
import PageHeader from 'components/_shared/PageHeader'
import PostList from 'components/PostList'
import CommentList from 'components/CommentList'

import styles from './myPage.module.scss'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Profile = () => {
  const navigate = useNavigate()
  const setIsLoggedIn = useSetRecoilState(isLoggedInState)
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState)
  // TODO: 랜덤 닉네임 생성
  const [newDisplayName, setNewDisplayname] = useState(currentUser?.displayName || '')
  const [myPosts, setMyPosts] = useState<IPost[]>([])
  const [myComments, setMyComments] = useState<IComment[]>([])
  const [postsView, setPostsView] = useState(false)
  const [commentsView, setCommentsView] = useState(false)

  const getMyWritings = async () => {
    const postsQuery = query(collection(myDb, 'posts'), where('userId', '==', currentUser?.uid))
    const commentsQuery = query(collection(myDb, 'comments'), where('user.id', '==', currentUser?.uid))

    onSnapshot(postsQuery, (snapshot) => {
      const postList = snapshot.docs.map(
        (document) =>
          ({
            id: document.id,
            ...document.data(),
          } as IPost)
      )
      setMyPosts(postList)
    })

    onSnapshot(commentsQuery, (snapshot) => {
      const commentList = snapshot.docs.map(
        (document) =>
          ({
            id: document.id,
            ...document.data(),
          } as IComment)
      )
      setMyComments(commentList)
    })
  }

  useMount(() => {
    setNewDisplayname(currentUser?.displayName || '')
    getMyWritings()
  })

  const handleDisplayNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewDisplayname(event.target.value)
  }

  const handleMyPostsClick = () => {
    setPostsView((prev) => !prev)
    setCommentsView(false)
  }

  const handleMyCommentsClick = () => {
    setCommentsView((prev) => !prev)
    setPostsView(false)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (currentUser?.displayName === newDisplayName) return

    await updateProfile(auth.currentUser as User, {
      displayName: newDisplayName,
    })

    setCurrentUser(cloneDeep(auth.currentUser))
  }

  const handleLogOutClick = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
    signOut(auth)
    Swal.fire('성공적으로 로그아웃 되었습니다.')
    navigate('/')
  }

  return (
    <>
      <PageHeader title='마이 페이지' />
      <div className={styles.profileImage}>
        <img src={String(currentUser?.photoURL)} alt='user profile' />
      </div>
      <form onSubmit={handleSubmit} className={styles.displayName}>
        <input
          type='text'
          placeholder='닉네임을 입력해주세요'
          value={newDisplayName}
          onChange={handleDisplayNameChange}
        />
        {currentUser?.displayName !== newDisplayName && <button type='submit'>변경</button>}
      </form>
      <div className={styles.myWritings}>
        <dl>
          <button type='button' onClick={handleMyPostsClick} className={cx(postsView && styles.active)}>
            <dt>내가 쓴 글</dt>
            <dd>{myPosts?.length || 0}</dd>
          </button>
          <button type='button' onClick={handleMyCommentsClick} className={cx(commentsView && styles.active)}>
            <dt>내가 쓴 댓글</dt>
            <dd>{myComments?.length || 0}</dd>
          </button>
        </dl>
        <div>
          {postsView && <PostList posts={myPosts} />}
          {commentsView && <CommentList comments={myComments} />}
        </div>
      </div>
      <div className={styles.editInfo}>
        <h4>내 정보 변경</h4>
        <ul>
          <li>
            <div>계정정보</div>
            <div>{currentUser?.email}</div>
          </li>
          <li>
            <button type='button' onClick={handleLogOutClick}>
              로그아웃
            </button>
          </li>
          <li>
            {/* TODO: 회원 탈퇴 기능 */}
            <button type='button'>회원 탈퇴</button>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Profile
