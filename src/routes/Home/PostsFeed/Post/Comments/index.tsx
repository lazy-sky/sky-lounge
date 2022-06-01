import { useState, ChangeEvent, FormEvent } from 'react'
import { useRecoilValue } from 'recoil'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'

import { myDb } from 'myFirebase'
import { currentUserState, isLoggedInState } from 'store/atom'
import { IPost } from 'types/post'
import noimage from '../noimage.jpg'

import styles from './comments.module.scss'

const Comments = ({ post }: { post: IPost }) => {
  const isLoggedIn = useRecoilValue(isLoggedInState)
  const currentUser = useRecoilValue(currentUserState)
  const [text, setText] = useState('')

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (text === '') return

    const targetRef = doc(myDb, 'posts', post.id)
    await updateDoc(targetRef, {
      comments: arrayUnion({
        id: String(Math.random()),
        user: { name: currentUser?.displayName, profileImg: currentUser?.photoURL },
        text,
      }),
    })

    setText('')
  }

  return (
    <div>
      {isLoggedIn ? (
        <div className={styles.commentForm}>
          <img src={String(currentUser?.photoURL)} alt='user profile' />
          <form onSubmit={handleSubmit} className={styles.createComment}>
            <input value={text} onChange={handleTextChange} placeholder='댓글을 입력하세요' />
            <button type='submit'>등록</button>
          </form>
        </div>
      ) : (
        <div className={styles.commentForm}>
          <img src={noimage} alt='user profile' />
          <div className={styles.createComment}>
            <input placeholder='가입 사용자만 이용할 수 있습니다.' />
            <button type='button'>등록</button>
          </div>
        </div>
      )}

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
    </div>
  )
}

export default Comments
