import { IPost } from 'types/post'
import PostItem from './PostItem'

const PostList = ({ posts }: { posts: IPost[] }) => {
  return (
    <ul>
      {posts?.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </ul>
  )
}

export default PostList
