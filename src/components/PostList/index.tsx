import { IPost } from 'types/post'
import PostItem from './PostItem'

// TODO: 정렬(최신순, 좋아요순), 태그 필터링
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
