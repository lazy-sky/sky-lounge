import { Dispatch } from 'react'
import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore'

import { myDb } from './myFirebase'
import { IPost } from 'types/post'

export const setPostsInRealTime = (setPosts: Dispatch<React.SetStateAction<IPost[]>>) => {
  const q = query(collection(myDb, 'posts'), orderBy('createdAt', 'desc'))
  onSnapshot(q, (snapshot) => {
    const postList = snapshot.docs.map(
      (document) =>
        ({
          id: document.id,
          ...document.data(),
        } as IPost)
    )
    setPosts(postList)
  })
}

export const setMyDataInRealTime = (type: string, setter: Dispatch<React.SetStateAction<any[]>>, userId: string) => {
  const q = query(collection(myDb, type), where('user.id', '==', userId))

  onSnapshot(q, (snapshot) => {
    const dataList = snapshot.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }))
    setter(dataList)
  })
}

export const getPost = async (id: string) => {
  const targetRef = doc(myDb, 'posts', id)
  const targetDoc = await getDoc(targetRef)

  return targetDoc.data()
}

export const createPost = async (user: any, content: { text: string; imgSrc?: string }, tags?: string[]) => {
  await addDoc(collection(myDb, 'posts'), {
    user: { id: user?.uid, name: user?.displayName, profileImg: user?.photoURL },
    createdAt: Date.now(),
    updatedAt: Date.now(),
    content,
    tags,
    like: [],
    comment: [],
  })
}

export const updatePost = async (id: string, content: { text: string; imgSrc?: string }, tags?: string[]) => {
  const targetRef = doc(myDb, 'posts', id)

  await updateDoc(targetRef, {
    updatedAt: Date.now(),
    content,
    tags,
  })
}
