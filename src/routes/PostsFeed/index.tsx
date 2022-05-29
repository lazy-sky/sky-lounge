import styles from './postsFeed.module.scss'
import noimage from './noimage.jpg'
import { CommentIcon, LikePressedIcon, LikeUnpressedIcon, OptionsIcon } from 'assets/svgs'
import { myDb } from 'myFirebase'
import { collection, getDocs, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { IPost } from 'types/post'

const PostsFeed = () => {
  // TODO: react query로 관리
  const [posts, setPosts] = useState<IPost[]>([])

  const getPosts = async () => {
    const q = query(collection(myDb, 'posts'))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      setPosts((prev) => [
        {
          ...doc.data(),
          id: doc.id,
        } as IPost,
        ...prev,
      ])
    })
  }

  useEffect(() => {
    getPosts()
  }, [])

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
              <OptionsIcon />
            </div>
            <div className={styles.content}>
              <p className={styles.contentText}>{post.content.text}</p>
              {post.content.imgSrc && <img src={post.content.imgSrc || noimage} alt={String(post.id)} />}
            </div>
            <div className={styles.postFooter}>
              {/* TODO: 서버 정보로 교체 */}
              <div>{post.like?.users.includes('myid') ? <LikePressedIcon /> : <LikeUnpressedIcon />}</div>
              <div>{post.like?.count}</div>
              <CommentIcon />
              <div>{post.comments?.count}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostsFeed
