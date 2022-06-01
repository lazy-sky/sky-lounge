import { useEffect, useMemo, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'

import { myDb } from 'myFirebase'
import { IPost } from 'types/post'
import Post from './Post'

import styles from './postsFeed.module.scss'

const PostsFeed = () => {
  const [posts, setPosts] = useState<IPost[]>([])

  useEffect(() => {
    const q = query(collection(myDb, 'posts'), orderBy('createdAt', 'desc'))
    onSnapshot(q, (snapshot) => {
      const postList = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as IPost)
      )
      setPosts(postList)
    })
  }, [])

  const PostList = useMemo(
    () => (
      <ul className={styles.postList}>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    ),
    [posts]
  )

  return <div className={styles.postsFeed}>{PostList}</div>
}

export default PostsFeed
