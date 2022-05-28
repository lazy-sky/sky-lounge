import styles from './postsFeed.module.scss'
import noimage from './noimage.jpg'
import { CommentIcon, LikePressedIcon, LikeUnpressedIcon, OptionsIcon } from 'assets/svgs'

const postsData = [
  {
    id: 1,
    userName: '하쿠나마타타',
    createdAt: '22.05.28',
    content: {
      text: '어쩌구 저쩌구',
      imgSrc: ['image1'],
    },
    tags: ['tag1', 'tag2', 'tag3'],
    like: {
      count: 1,
      users: ['myid'],
    },
    comments: {
      count: 2,
      contents: [
        { user: 1, text: 'asldkf' },
        { user: 2, text: 'fdlgkf' },
      ],
    },
  },

  {
    id: 2,
    userName: '우쿨렐레',
    createdAt: '22.05.29',
    content: { text: '이러쿵 저러쿵' },
    tags: ['tag1', 'tag3'],
    like: {
      count: 1,
      users: ['notmyid'],
    },
    comments: {
      count: 1,
      contents: [{ user: 1, text: 'asldkf' }],
    },
  },
  {
    id: 3,
    userName: '미어캣',
    createdAt: '22.05.30',
    content: {
      text: '우와ㅏㅏㅏ',
      imgSrc: ['image1'],
    },
    tags: ['tag1', 'tag2'],
    like: {
      count: 1,
      users: ['myid'],
    },
    comments: {
      count: 2,
      contents: [
        { user: 1, text: 'asldkf' },
        { user: 2, text: 'fdlgkf' },
      ],
    },
  },
  {
    id: 4,
    userName: '하늘이',
    createdAt: '22.05.30',
    content: {
      text: '머랭쿠키',
    },
    tags: ['tag2', 'tag4'],
    like: {
      count: 0,
      users: [],
    },
    comments: {
      count: 0,
      contents: [],
    },
  },
]

const PostsFeed = () => {
  return (
    <div className={styles.postsFeed}>
      <h1>아무말 저장소</h1>
      <ul className={styles.postList}>
        {postsData.map((post) => (
          <li key={post.id} className={styles.post}>
            <ul className={styles.tags}>
              {post.tags.map((tag) => (
                <li key={tag} className={styles.tag}>
                  {tag}
                </li>
              ))}
            </ul>
            <div className={styles.metaInfo}>
              <div>
                <div className={styles.user}>{post.userName}</div>
                <div className={styles.createdAt}>{post.createdAt}</div>
              </div>
              <OptionsIcon />
            </div>
            <div className={styles.content}>
              <p className={styles.contentText}>{post.content.text}</p>
              {/* TODO: 서버 저장된 이미지 불러오도록 */}
              {post.content.imgSrc && <img src={noimage} alt={String(post.id)} />}
            </div>
            <div className={styles.postFooter}>
              {/* TODO: 서버 정보로 교체 */}
              <div>{post.like?.users.includes('myid') ? <LikePressedIcon /> : <LikeUnpressedIcon />}</div>
              <div>{post.like?.count}</div>
              <CommentIcon />
              <div>{post.comments?.count}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostsFeed
