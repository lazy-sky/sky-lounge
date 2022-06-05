import { useEffect, useState } from 'react'
import { useMount } from 'react-use'
import cx from 'classnames'

import { IPost } from 'types/post'
import { setPostsInRealTime } from 'services/data'
import PostList from 'components/PostList'
import Loading from 'components/_shared/Loading'

import styles from './postsFeed.module.scss'

export const tags = ['자랑', '스터디', '구인', '홍보', '공지', '챌린지', '잡담', '일상', '코유', '코무', '기타']

const PostsFeed = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [posts, setPosts] = useState<IPost[]>([])
  const [filterTags, setFilterTags] = useState<string[]>([])
  const [isSortedByLatest, setIsSortedByLateset] = useState(true)

  // TODO: 테스트 중 무료 플랜 한도 초과 발생
  // 갑자기 유료 플랜으로 업그레이드하게 되어 무한 스크롤 및 레이지 로딩은 추후 구현
  useMount(() => {
    setPostsInRealTime(setPosts)
  })

  useEffect(() => {
    setIsLoading((_) => true)
    if (posts.length === 0) return

    setIsLoading((_) => false)
  }, [posts])

  const handleSortByLatestSelect = () => {
    setPosts((prev) => [...prev.sort((a, b) => Number(b.createdAt) - Number(a.createdAt))])
    setIsSortedByLateset(true)
  }

  const handleSortByLikeSelect = () => {
    setPosts((prev) => [...prev.sort((a, b) => (b.like?.length || 0) - (a.like?.length || 0))])
    setIsSortedByLateset(false)
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
      <div className={styles.options}>
        <ul className={styles.tags}>
          {tags.map((tag) => (
            <li key={tag} className={cx(styles.tag, filterTags.includes(tag) && styles.active)}>
              <button type='button' onClick={() => handleTagSelect(tag)}>
                {tag}
              </button>
            </li>
          ))}
        </ul>
        <div className={styles.sort}>
          <button type='button' onClick={handleSortByLatestSelect} className={cx(isSortedByLatest && styles.active)}>
            최신순
          </button>
          <button type='button' onClick={handleSortByLikeSelect} className={cx(!isSortedByLatest && styles.active)}>
            좋아요순
          </button>
        </div>
      </div>
      {isLoading ? (
        <Loading type='spinningBubbles' />
      ) : (
        <PostList posts={posts} isSortedByLatest={isSortedByLatest} filterTags={filterTags} />
      )}
    </div>
  )
}

export default PostsFeed
