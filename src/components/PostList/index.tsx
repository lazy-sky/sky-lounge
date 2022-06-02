import { IPost } from 'types/post'
import PostItem from './PostItem'

// TODO: 페이지네이션 및 무한 스크롤 적용
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
