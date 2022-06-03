import { useState, ChangeEvent, FormEvent } from 'react'
import { useRecoilValue } from 'recoil'
import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore'

import { myDb } from 'services/myFirebase'
import { currentUserState, isLoggedInState } from 'store/atom'
import { IPost } from 'types/post'
import noimage from '../../assets/svgs/noimage.svg'

import styles from './commentsWrapper.module.scss'
import CommentList from 'components/CommentList'

const CommentsWrapper = ({ post }: { post: IPost }) => {
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
        user: { id: currentUser?.uid, name: currentUser?.displayName, profileImg: currentUser?.photoURL },
        text,
      }),
    })

    await addDoc(collection(myDb, 'comments'), {
      user: {
        id: currentUser?.uid,
        name: currentUser?.displayName,
        profileImg: currentUser?.photoURL,
      },
      text,
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
      <CommentList post={post} />
    </div>
  )
}

export default CommentsWrapper
