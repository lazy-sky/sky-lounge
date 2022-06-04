import { useMemo } from 'react'
import { IPost } from 'types/post'
import PostItem from './PostItem'

import styles from './postList.module.scss'

interface IPostList {
  posts: IPost[]
  isSortedByLatest?: boolean
  filterTags?: string[]
}

const PostList = ({ posts, isSortedByLatest, filterTags }: IPostList) => {
  if (!isSortedByLatest) {
    posts?.sort((a, b) => (b.like?.length || 0) - (a.like?.length || 0))
  }

  const PostItems = useMemo(
    () => (
      <ul className={styles.postList}>
        {posts?.map((post) => (
          <PostItem key={post.id} post={post} filterTags={filterTags} />
        ))}
      </ul>
    ),
    [filterTags, posts]
  )

  return <div>{PostItems}</div>
}

export default PostList
