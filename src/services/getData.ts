import { Dispatch } from 'react'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'

import { myDb } from './myFirebase'
import { IPost } from 'types/post'

export const setPostsInRealTime = (setPosts: Dispatch<React.SetStateAction<IPost[]>>) => {
  const q = query(collection(myDb, 'posts'), orderBy('createdAt', 'desc'))
  onSnapshot(q, (snapshot) => {
    const postList = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
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
