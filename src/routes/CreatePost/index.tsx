/* eslint-disable react/no-children-prop */
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { addDoc, collection } from 'firebase/firestore'
import cx from 'classnames'

import { myDb } from 'myFirebase'
import { currentUserState } from 'store/atom'
import PageHeader from 'components/_shared/PageHeader'
import { CameraIcon } from 'assets/svgs'

import styles from './createPost.module.scss'

// TODO: 수정 모드 추가

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

  const handleCreateClick = useCallback(async () => {
    if (text === '') return

    await addDoc(collection(myDb, 'posts'), {
      userId: currentUser?.uid,
      userName: currentUser?.displayName,
      createdAt: Date.now(),
      content: { text, imgSrc },
      tags: selectedTags,
      like: [],
      comment: [],
    })

    setText('')
    navigate('/')
  }, [currentUser, imgSrc, navigate, selectedTags, text])

  const SubmitButton = useMemo(
    () => (
      <button type='button' onClick={handleCreateClick} className={styles.submitBtn}>
        남기기
      </button>
    ),
    [handleCreateClick]
  )

  return (
    <div className={styles.container}>
      <PageHeader title='게시물 만들기' hasBackBtn children={SubmitButton} />
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
