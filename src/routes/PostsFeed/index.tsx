import { useEffect, useState } from 'react'
import { collection, getDocs, query } from 'firebase/firestore'

import { myDb } from 'myFirebase'
import { IPost } from 'types/post'

import styles from './postsFeed.module.scss'

import Post from './Post'

const PostsFeed = () => {
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

  return (
    <div className={styles.postsFeed}>
      <h1>아무말 저장소</h1>
      <ul className={styles.postList}>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    </div>
  )
}

export default PostsFeed
