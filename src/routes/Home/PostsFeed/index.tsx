import { useState } from 'react'
import { useMount } from 'react-use'

import { IPost } from 'types/post'
import { setPostsInRealTime } from 'services/getData'
import PostList from 'components/PostList'

import styles from './postsFeed.module.scss'

export const tags = ['자랑', '스터디', '구인', '홍보', '공지', '챌린지', '잡담', '일상', '코유', '코무', '기타']

const PostsFeed = () => {
  const [posts, setPosts] = useState<IPost[]>([])
  const [filterTags, setFilterTags] = useState<string[]>([])

  // TODO: 테스트 중 무료 플랜 한도 초과 발생
  // 갑자기 유료 플랜으로 업그레이드하게 되어 무한 스크롤 및 레이지 로딩은 추후 구현
  useMount(() => {
    setPostsInRealTime(setPosts)
  })

  const handleSortByLatestSelect = () => {
    setPosts((prev) => [...prev.sort((a, b) => Number(b.createdAt) - Number(a.createdAt))])
  }

  const handleSortByLikeSelect = () => {
    setPosts((prev) => [...prev.sort((a, b) => (b.like?.length || 0) - (a.like?.length || 0))])
  }

  const handleTagSelect = (tag: string) => {
    if (filterTags.includes(tag)) {
      setFilterTags((prev) => prev.filter((filterTag) => filterTag !== tag))
      return
    }
    setFilterTags((prev) => [tag, ...prev])
  }

  return (
    <div className={styles.postsFeed}>
      <div>
        <ul>
          {tags.map((tag) => (
            <li key={tag}>
              <button type='button' onClick={() => handleTagSelect(tag)}>
                {tag}
              </button>
            </li>
          ))}
        </ul>
        <button type='button' onClick={handleSortByLatestSelect}>
          최신순
        </button>
        <button type='button' onClick={handleSortByLikeSelect}>
          좋아요순
        </button>
      </div>
      <PostList posts={posts} filterTags={filterTags} />
    </div>
  )
}

export default PostsFeed
