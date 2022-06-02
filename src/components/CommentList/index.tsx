import { IComment, IPost } from 'types/post'
import styles from './commentList.module.scss'

interface ICommentList {
  post?: IPost
  comments?: IComment[]
}

const CommentList = ({ post, comments }: ICommentList) => {
  if (post) {
    return (
      <ul className={styles.commentList}>
        {post.comments?.map((comment) => (
          <li key={comment.id}>
            <div className={styles.commenter}>
              <img src={String(comment.user.profileImg)} alt='' />
              <div>{comment.user.name}</div>
            </div>
            <div className={styles.comment}>{comment.text}</div>
          </li>
        ))}
      </ul>
    )
  }

  if (comments) {
    return (
      <ul className={styles.commentList}>
        {comments.map((comment) => (
          <li key={comment.id}>
            <div className={styles.commenter}>
              <img src={String(comment.user.profileImg)} alt='' />
              <div>{comment.user.name}</div>
            </div>
            <div className={styles.comment}>{comment.text}</div>
          </li>
        ))}
      </ul>
    )
  }

  return null
}

export default CommentList
