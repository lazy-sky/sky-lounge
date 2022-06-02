import { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'

import { myDb } from 'myFirebase'
import { IPost } from 'types/post'
import PostList from 'components/PostList'

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

  return (
    <div className={styles.postsFeed}>
      <PostList posts={posts} />
    </div>
  )
}

export default PostsFeed
