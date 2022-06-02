import { useState, ChangeEvent, FormEvent, MouseEvent } from 'react'
import { useRecoilState } from 'recoil'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut, updateProfile, User } from 'firebase/auth'
import { cloneDeep } from 'lodash'
import { useMount } from 'react-use'

import { auth, myDb } from 'myFirebase'
import { IComment, IPost } from 'types/post'
import { currentUserState, isLoggedInState } from 'store/atom'
import PageHeader from 'components/_shared/PageHeader'
import PostList from 'components/PostList'
import CommentList from 'components/CommentList'
import { GithubIcon, GoogleIcon } from 'assets/svgs'

import styles from './myPage.module.scss'

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState)
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

  const handleSocialLoginClick = async (event: MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event

    if (name === 'google') {
      await signInWithPopup(auth, new GoogleAuthProvider())
    }

    if (name === 'github') {
      await signInWithPopup(auth, new GithubAuthProvider())
    }

    setCurrentUser(cloneDeep(auth.currentUser))
  }

  const handleDisplayNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewDisplayname(event.target.value)
  }

  const handleMyPostsClick = () => {
    setPostsView((prev) => !prev)
  }

  const handleMyCommentsClick = () => {
    setCommentsView((prev) => !prev)
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
  }

  return (
    <>
      <PageHeader title='마이 페이지' />
      {isLoggedIn ? (
        <>
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
          <div>
            <dl>
              <dt>
                <button type='button' onClick={handleMyPostsClick}>
                  내가 쓴 글
                </button>
              </dt>
              <dd>{myPosts?.length || 0}</dd>
              <dt>
                <button type='button' onClick={handleMyCommentsClick}>
                  내가 쓴 댓글
                </button>
              </dt>
              <dd>{myComments?.length || 0}</dd>
            </dl>
            {postsView && <PostList posts={myPosts} />}
            {commentsView && <CommentList comments={myComments} />}
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
      ) : (
        <>
          <div className={styles.logo}>서비스 로고</div>
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
      )}
    </>
  )
}

export default Profile
