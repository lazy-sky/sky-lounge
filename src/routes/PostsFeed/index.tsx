import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { collection, doc, getDocs, query, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore'

import { myDb } from 'myFirebase'
import { currentUserState } from 'store/atom'
import { IPost } from 'types/post'
import { CommentIcon, LikePressedIcon, LikeUnpressedIcon, OptionsIcon } from 'assets/svgs'

import styles from './postsFeed.module.scss'
import noimage from './noimage.jpg'

const PostsFeed = () => {
  const currentUser = useRecoilValue(currentUserState)
  // TODO: react query로 관리
  const [posts, setPosts] = useState<IPost[]>([])

  const getPosts = async () => {
    const q = query(collection(myDb, 'posts'))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((currentDoc) => {
      setPosts((prev) => [
        ...prev,
        {
          ...currentDoc.data(),
          id: currentDoc.id,
        } as IPost,
      ])
    })
  }

  useEffect(() => {
    getPosts()
  }, [])

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

  return (
    <div className={styles.postsFeed}>
      <h1>아무말 저장소</h1>
      <ul className={styles.postList}>
        {posts.map((post) => (
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
              <CommentIcon />
              {/* TODO: 서버 정보로 교체 */}
              <div>{post.comments?.length || 0}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostsFeed
