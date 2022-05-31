import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { addDoc, collection } from 'firebase/firestore'
import cx from 'classnames'

import { myDb } from 'myFirebase'
import { currentUserState } from 'store/atom'

import styles from './createPost.module.scss'
import { CameraIcon } from 'assets/svgs'

// TODO: 수정 모드 추가
// TODO: PageTitle, 뒤로가기 버튼 옵셔널 props

// interface HeaderProps {
//   title: string
//   style?: string
//   children?: React.ReactNode
// }

// <Header title='의견'>
//   <BackButton />
//   <SubmitButton text={getRequestedPage() === 'edit' ? '수정' : '남기기'} onClick={handleSubmitPost} />
// </Header>

const CreatePost = () => {
  const navigate = useNavigate()
  const currentUser = useRecoilValue(currentUserState)
  const [text, setText] = useState('')
  const [imgSrc, setImgSrc] = useState('')
  const tags = ['태그1', '태그2', '태그3', '태그4', '태그5']
  const [selectedTags, setSelectedTags] = useState<string[]>([])

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
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((prev) => prev !== tag))
      return
    }

    setSelectedTags((prev) => [...prev, tag])
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (text === '') return

    await addDoc(collection(myDb, 'posts'), {
      userId: currentUser?.uid,
      userName: currentUser?.displayName,
      createdAt: String(new Date()),
      content: { text, imgSrc },
      tags: selectedTags,
      like: [],
      comment: [],
    })

    setText('')
    navigate('/')
  }

  return (
    <div>
      <ul className={styles.tags}>
        {tags.map((tag) => (
          <li key={tag} className={cx(styles.tag, selectedTags.includes(tag) && styles.active)}>
            <button type='button' onClick={() => handleTagClick(tag)}>
              {tag}
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className={styles.createForm}>
        <div className={styles.attachment}>
          <div className={styles.addImage}>
            <label htmlFor='imageFile'>
              <CameraIcon />
            </label>
          </div>
          {imgSrc && (
            <>
              <img src={imgSrc} alt='attachment' />
              <button type='button' onClick={handleFileClear}>
                삭제
              </button>
            </>
          )}
        </div>
        <input id='imageFile' type='file' accept='image/*' onChange={handleFileChange} style={{ display: 'none' }} />
        <textarea value={text} onChange={handleTextChange} placeholder="What's on your mind?" />
        <button type='submit'>생성</button>
      </form>
    </div>
  )
}

export default CreatePost
