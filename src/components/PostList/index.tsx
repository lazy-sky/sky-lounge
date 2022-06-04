import { IPost } from 'types/post'
import PostItem from './PostItem'

import styles from './postList.module.scss'

const PostList = ({ posts, filterTags }: { posts: IPost[]; filterTags?: string[] }) => {
  return (
    <ul className={styles.postList}>
      {posts?.map((post) => (
        <PostItem key={post.id} post={post} filterTags={filterTags} />
      ))}
    </ul>
  )
}

export default PostList
