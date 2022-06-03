import { useState } from 'react'
import { useMount } from 'react-use'

import { IPost } from 'types/post'
import { setPostsInRealTime } from 'services/getData'
import PostList from 'components/PostList'

import styles from './postsFeed.module.scss'

const PostsFeed = () => {
  const [posts, setPosts] = useState<IPost[]>([])

  useMount(() => {
    setPostsInRealTime(setPosts)
  })

  return (
    <div className={styles.postsFeed}>
      <PostList posts={posts} />
    </div>
  )
}

export default PostsFeed
