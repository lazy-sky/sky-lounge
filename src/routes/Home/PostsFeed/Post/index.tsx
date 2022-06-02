import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { arrayRemove, arrayUnion, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore'

import { currentUserState, isLoggedInState } from 'store/atom'
import { IPost } from 'types/post'
import { myDb } from 'myFirebase'
import Comments from './Comments'
import { CommentIcon, LikePressedIcon, LikeUnpressedIcon, OptionsIcon } from 'assets/svgs'

import styles from './post.module.scss'
import noimage from './noimage.jpg'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Post = ({ post }: { post: IPost }) => {
  const navigate = useNavigate()
  const isLoggedIn = useRecoilValue(isLoggedInState)
  const currentUser = useRecoilValue(currentUserState)
  const [optionsView, setIsOptionsView] = useState(false)
  const [commentsView, setCommentsView] = useState(false)

  // TODO: 디바운싱
  // TODO: Optimistic UI
  const handleLikeToggle = async (postId: string) => {
    if (!isLoggedIn) {
      Swal.fire('로그인이 필요합니다.')
      navigate('/mypage')
      return
    }

    const targetRef = doc(myDb, 'posts', postId)
    const targetDoc = await getDoc(targetRef)

    if (targetDoc.data()?.like.includes(currentUser?.uid)) {
      await updateDoc(targetRef, {
        like: arrayRemove(currentUser?.uid),
      })
    } else {
      await updateDoc(targetRef, {
        like: arrayUnion(currentUser?.uid),
      })
    }
  }

  const handleOptionClick = () => {
    setIsOptionsView((prev) => !prev)
  }

  const handleCommentsClick = () => {
    setCommentsView((prev) => !prev)
  }

  const handleDeleteClick = async (postId: string) => {
    Swal.fire({ title: '정말로 삭제하시겠습니까?', showDenyButton: true }).then(async ({ isConfirmed }) => {
      if (isConfirmed) {
        await deleteDoc(doc(myDb, 'posts', postId))
      }
    })
  }

  const handleEditClick = (postId: string) => {
    navigate(`/write/${postId}`)
  }

  return (
    <li key={post.id} className={styles.post}>
      <ul className={styles.tags}>
        {post.tags?.map((tag) => (
          <li key={tag} className={styles.tag}>
            {tag}
          </li>
        ))}
      </ul>
      <div className={styles.metaInfo}>
        <div>
          <div className={styles.user}>{post.userName}</div>
          <div className={styles.createdAt}>{new Date(post.createdAt).toString()}</div>
        </div>
        {post.userId === currentUser?.uid && (
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
        )}
      </div>
      <div className={styles.content}>
        <p className={styles.contentText}>{post.content.text}</p>
        {post.content.imgSrc && <img src={post.content.imgSrc || noimage} alt={String(post.id)} />}
      </div>
      <div className={styles.postFooter}>
        <button type='button' onClick={() => handleLikeToggle(post.id)}>
          {post.like?.includes(currentUser?.uid || '') ? <LikePressedIcon /> : <LikeUnpressedIcon />}
        </button>
        <div>{post.like?.length || 0}</div>
        <button type='button' onClick={handleCommentsClick}>
          <CommentIcon />
        </button>
        <div>{post.comments?.length || 0}</div>
      </div>
      {commentsView && <Comments post={post} />}
    </li>
  )
}

export default Post
