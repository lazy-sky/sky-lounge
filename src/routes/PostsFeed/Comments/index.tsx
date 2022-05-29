import { useState, ChangeEvent, FormEvent } from 'react'
import { useRecoilValue } from 'recoil'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'

import { myDb } from 'myFirebase'
import { currentUserState } from 'store/atom'
import { IPost } from 'types/post'

const Comments = ({ post }: { post: IPost }) => {
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
        user: currentUser?.displayName,
        text,
      }),
    })

    setText('')
  }

  return (
    <div>
      <img src={String(currentUser?.photoURL)} alt='user profile' width={24} />
      <form onSubmit={handleSubmit}>
        <input value={text} onChange={handleTextChange} placeholder='댓글을 입력하세요' />
        <button type='submit'>등록</button>
      </form>
      <ul>
        {post.comments?.map((comment) => (
          <li key={comment.id}>
            <div>{comment.user}</div>
            <div>{comment.text}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Comments
