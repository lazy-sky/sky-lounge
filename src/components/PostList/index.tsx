import { IPost } from 'types/post'
import PostItem from './PostItem'

const PostList = ({ posts, filterTags }: { posts: IPost[]; filterTags?: string[] }) => {
  return (
    <ul>
      {posts?.map((post) => (
        <PostItem key={post.id} post={post} filterTags={filterTags} />
      ))}
    </ul>
  )
}

export default PostList
