import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'

import { currentUserState } from 'store/atom'
import { IPost } from 'types/post'
import { myDb } from 'myFirebase'
import Comments from '../Comments'
import { CommentIcon, LikePressedIcon, LikeUnpressedIcon, OptionsIcon } from 'assets/svgs'

import styles from './post.module.scss'
import noimage from './noimage.jpg'

const Post = ({ post }: { post: IPost }) => {
  const currentUser = useRecoilValue(currentUserState)
  const [commentsView, setCommentsView] = useState(false)

  // TODO: 디바운싱
  // TODO: Optimistic UI
  const handleLikeToggle = async (postId: string) => {
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

  const handleCommentsView = () => {
    setCommentsView((prev) => !prev)
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
          <div className={styles.createdAt}>{post.createdAt}</div>
        </div>
        {post.userId === currentUser?.uid && <OptionsIcon />}
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
        <button type='button' onClick={handleCommentsView}>
          <CommentIcon />
        </button>
        <div>{post.comments?.length || 0}</div>
      </div>
      {commentsView && <Comments post={post} />}
    </li>
  )
}

export default Post
