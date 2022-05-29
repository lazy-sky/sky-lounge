import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { addDoc, collection } from 'firebase/firestore'

import { myDb } from 'myFirebase'
import { currentUserState } from 'store/atom'

const CreatePost = () => {
  const navigate = useNavigate()
  const currentUser = useRecoilValue(currentUserState)
  const [text, setText] = useState('')
  const [imgSrc, setImgSrc] = useState('')
  const [tags, setTags] = useState<string[]>([])

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const theFile = event.target.files?.[0] as File
    const reader = new FileReader()
    reader.onloadend = () => {
      setImgSrc(String(reader.result))
    }

    reader.readAsDataURL(theFile)
  }

  const handleFileClear = () => setImgSrc('')

  const handleTagClick = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((prev) => prev !== tag))
      return
    }

    setTags((prev) => [...prev, tag])
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (text === '') return

    await addDoc(collection(myDb, 'posts'), {
      userId: currentUser?.uid,
      userName: currentUser?.displayName,
      createdAt: String(new Date()),
      content: { text, imgSrc },
      tags,
      like: [],
      comment: [],
    })

    setText('')
    navigate('/')
  }

  return (
    <div>
      <ul style={{ display: 'flex', gap: '10px' }}>
        {['tag1', 'tag2', 'tag3', 'tag4', 'tag5'].map((tag) => (
          <li key={tag}>
            <button type='button' onClick={() => handleTagClick(tag)}>
              {tag}
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <textarea value={text} onChange={handleTextChange} placeholder="What's on your mind?" />
        <label htmlFor='imageFile'>사진 추가</label>
        <input
          id='imageFile'
          type='file'
          accept='image/*'
          onChange={handleFileChange}
          style={{
            opacity: 0,
          }}
        />
        <button type='submit'>생성</button>
      </form>
      {imgSrc && (
        <div>
          <img src={imgSrc} alt='attachment' width='50px' height='50px' />
          <button type='button' onClick={handleFileClear}>
            Remove
          </button>
        </div>
      )}
    </div>
  )
}

export default CreatePost
