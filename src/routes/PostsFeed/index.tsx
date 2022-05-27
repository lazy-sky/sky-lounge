import styles from './postsFeed.module.scss'

const postsData = [
  { id: 1, userName: '하쿠나마타타', content: { text: '어쩌구 저쩌구' } },
  { id: 2, userName: '우쿨렐레', content: { text: '이러쿵 저러쿵' } },
  { id: 3, userName: '미어캣', content: { text: '우와ㅏㅏㅏ' } },
  { id: 4, userName: '하늘이', content: { text: '머랭쿠키' } },
]

const PostsFeed = () => {
  return (
    <div className={styles.postsFeed}>
      <h1>아무말 저장소</h1>
      <ul>
        {postsData.map((post) => (
          <li key={post.id}>
            <div>{post.userName}</div>
            <div>{post.content.text}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostsFeed
