import { useState } from 'react'
import { useMount } from 'react-use'

import { IPost } from 'types/post'
import { setPostsInRealTime } from 'services/getData'
import PostList from 'components/PostList'

import styles from './postsFeed.module.scss'

const PostsFeed = () => {
  const [posts, setPosts] = useState<IPost[]>([])

  // TODO: 테스트 중 무료 플랜 한도 초과 발생
  // 갑자기 유료 플랜으로 업그레이드하게 되어 무한 스크롤 및 레이지 로딩은 추후 구현
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
