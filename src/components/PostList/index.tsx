import { IPost } from 'types/post'
import PostItem from './PostItem'

// TODO: 정렬(최신순, 좋아요순), 태그 필터링
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
