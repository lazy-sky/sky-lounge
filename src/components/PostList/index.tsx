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
    return (
      <ul className={styles.postList}>
        {posts
          .sort((a, b) => (b.like?.length || 0) - (a.like?.length || 0))
          .map((post) => (
            <PostItem key={post.id} post={post} filterTags={filterTags} />
          ))}
      </ul>
    )
  }

  return (
    <ul className={styles.postList}>
      {posts?.map((post) => (
        <PostItem key={post.id} post={post} filterTags={filterTags} />
      ))}
    </ul>
  )
}

export default PostList
