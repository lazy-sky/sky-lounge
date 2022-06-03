import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import cx from 'classnames'

import { myDb } from 'services/myFirebase'
import { currentUserState } from 'store/atom'
import PageHeader from 'components/_shared/PageHeader'
import SubmitButton from './SubmitButton'
import { CameraIcon } from 'assets/svgs'

import styles from './createPost.module.scss'

const CreatePost = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { pathname } = location
  const path = pathname.split('/')
  const paramId = path[path.length - 1]
  const isUpdateMode = !(!paramId || paramId === 'write')
  const pageTitle = isUpdateMode ? '게시물 만들기' : '게시글 수정하기'

  const currentUser = useRecoilValue(currentUserState)
  const [text, setText] = useState('')
  const [imgSrc, setImgSrc] = useState('')
  const tags = ['태그1', '태그2', '태그3', '태그4', '태그5']
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  useEffect(() => {
    if (!isUpdateMode) return
    ;(async () => {
      const targetRef = doc(myDb, 'posts', paramId)
      const targetDoc = await getDoc(targetRef)

      setText(targetDoc.data()?.content.text)
      setImgSrc(targetDoc.data()?.content.imgSrc)
      setSelectedTags(targetDoc.data()?.tags)
    })()
  }, [isUpdateMode, paramId])

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

  const handleCreateClick = useCallback(async () => {
    if (text === '') return

    await addDoc(collection(myDb, 'posts'), {
      user: { id: currentUser?.uid, name: currentUser?.displayName },
      createdAt: Date.now(),
      updatedAt: Date.now(),
      content: { text, imgSrc },
      tags: selectedTags,
      like: [],
      comment: [],
    })

    setText('')
    navigate('/')
  }, [currentUser, imgSrc, selectedTags, text, navigate])

  const handleUpdateClick = useCallback(async () => {
    const targetRef = doc(myDb, 'posts', paramId)

    await updateDoc(targetRef, {
      updatedAt: Date.now(),
      content: { text, imgSrc },
      tags: selectedTags,
    })

    setText('')
    navigate('/')
  }, [imgSrc, paramId, selectedTags, text, navigate])

  return (
    <div className={styles.container}>
      <PageHeader title={pageTitle} hasBackBtn>
        {isUpdateMode ? (
          <SubmitButton text='수정하기' onClick={handleUpdateClick} />
        ) : (
          <SubmitButton text='남기기' onClick={handleCreateClick} />
        )}
      </PageHeader>
      <ul className={styles.tags}>
        {tags.map((tag) => (
          <li key={tag} className={cx(styles.tag, selectedTags.includes(tag) && styles.active)}>
            <button type='button' onClick={() => handleTagClick(tag)}>
              {tag}
            </button>
          </li>
        ))}
      </ul>
      <form className={styles.createForm}>
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
        <textarea value={text} onChange={handleTextChange} placeholder='무슨 생각을 하고 있나요?' />
      </form>
    </div>
  )
}

export default CreatePost
