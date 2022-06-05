import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { arrayRemove, arrayUnion, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import Swal from 'sweetalert2'

import { currentUserState, isLoggedInState } from 'store/atom'
import { IPost } from 'types/post'
import { myDb } from 'services/myFirebase'
import { calculatePassedTime } from './utils'
import CommentsWrapper from 'components/CommentsWrapper'
import { CommentIcon, LikePressedIcon, LikeUnpressedIcon, OptionsIcon } from 'assets/svgs'
import noimage from '../../../assets/svgs/noimage.svg'

import styles from './postItem.module.scss'

const PostItem = ({ post, filterTags }: { post: IPost; filterTags?: string[] }) => {
  const navigate = useNavigate()
  const isLoggedIn = useRecoilValue(isLoggedInState)
  const currentUser = useRecoilValue(currentUserState)
  const [optionsView, setIsOptionsView] = useState(false)
  const [commentsView, setCommentsView] = useState(false)

  // TODO: 디바운싱 + Optimistic UI
  const handleLikeToggle = async (postId: string) => {
    if (!isLoggedIn) {
      Swal.fire('로그인이 필요합니다.')
      navigate('/signin')
      return
    }

    const targetRef = doc(myDb, 'posts', postId)
    const targetDoc = await getDoc(targetRef)

    if (targetDoc.data()?.like.includes(currentUser?.uid)) {
      await updateDoc(targetRef, {
        like: arrayRemove(currentUser?.uid),
      })
      return
    }

    await updateDoc(targetRef, {
      like: arrayUnion(currentUser?.uid),
    })
  }

  const handleOptionClick = () => {
    setIsOptionsView((prev) => !prev)
  }

  const handleCommentsClick = () => {
    setCommentsView((prev) => !prev)
  }

  const handleDeleteClick = async (postId: string) => {
    Swal.fire({ title: '정말로 삭제하시겠습니까?', showDenyButton: true }).then(async ({ isConfirmed }) => {
      if (!isConfirmed) return
      await deleteDoc(doc(myDb, 'posts', postId))
    })
  }

  const handleEditClick = useCallback(
    (postId: string) => {
      navigate(`/write/${postId}`)
    },
    [navigate]
  )

  const Tags = useMemo(
    () => (
      <ul className={styles.tags}>
        {post.tags?.map((tag) => (
          <li key={tag} className={styles.tag}>
            {tag}
          </li>
        ))}
      </ul>
    ),
    [post.tags]
  )

  const PostOptions = useMemo(
    () =>
      post.user.id === currentUser?.uid && (
        <div className={styles.optionBtn}>
          <button type='button' onClick={handleOptionClick}>
            <OptionsIcon />
          </button>
          {optionsView && (
            <ul className={styles.options}>
              <li>
                <button type='button' onClick={() => handleEditClick(post.id)}>
                  수정
                </button>
              </li>
              <li>
                <button type='button' onClick={() => handleDeleteClick(post.id)}>
                  삭제
                </button>
              </li>
            </ul>
          )}
        </div>
      ),
    [currentUser?.uid, handleEditClick, optionsView, post.id, post.user.id]
  )

  const LikeIcon = useMemo(
    () => (post.like?.includes(currentUser?.uid || '') ? <LikePressedIcon /> : <LikeUnpressedIcon />),
    [currentUser?.uid, post.like]
  )

  if ((filterTags?.length || 0) > 0 && filterTags?.filter((x) => post.tags?.includes(x)).length === 0) return null

  return (
    <li key={post.id} className={styles.post}>
      {Tags}
      <div className={styles.metaInfo}>
        <div className={styles.writer}>
          <img src={post.user.profileImg || noimage} alt='' />
          <div>
            <div className={styles.user}>{post.user.name}</div>
            <div className={styles.createdAt}>
              {calculatePassedTime(post.createdAt)}
              {post.createdAt !== post.updatedAt && '(수정됨)'}
            </div>
          </div>
        </div>
        {PostOptions}
      </div>
      <div className={styles.content}>
        <p className={styles.contentText}>{post.content.text}</p>
        {post.content.imgSrc && <img src={post.content.imgSrc || noimage} alt={String(post.id)} />}
      </div>
      <div className={styles.postFooter}>
        <button type='button' onClick={() => handleLikeToggle(post.id)}>
          {LikeIcon}
        </button>
        <div>{post.like?.length || 0}</div>
        <button type='button' onClick={handleCommentsClick}>
          <CommentIcon />
        </button>
        <div>{post.comments?.length || 0}</div>
      </div>
      {commentsView && <CommentsWrapper post={post} />}
    </li>
  )
}

export default PostItem
