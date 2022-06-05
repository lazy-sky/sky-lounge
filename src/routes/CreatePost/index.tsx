import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import cx from 'classnames'

import { currentUserState } from 'store/atom'
import { tags } from 'routes/Home/PostsFeed'
import PageHeader from 'components/_shared/PageHeader'
import SubmitButton from './SubmitButton'
import { CameraIcon } from 'assets/svgs'

import styles from './createPost.module.scss'
import { createPost, getPost, updatePost } from 'services/data'

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
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  useEffect(() => {
    if (!isUpdateMode) return
    ;(async () => {
      const post = await getPost(paramId)
      setText(post?.content.text)
      setImgSrc(post?.content.imgSrc)
      setSelectedTags(post?.tags)
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

    await createPost(currentUser, { text, imgSrc }, selectedTags)
    setText('')
    navigate('/')
  }, [currentUser, imgSrc, selectedTags, text, navigate])

  const handleUpdateClick = useCallback(async () => {
    updatePost(paramId, { text, imgSrc }, selectedTags)

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
