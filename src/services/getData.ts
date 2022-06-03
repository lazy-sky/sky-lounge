import { Dispatch } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'

import { IComment, IPost } from 'types/post'
import { myDb } from './myFirebase'

export const setMyPostsInRealTime = (setter: Dispatch<React.SetStateAction<IPost[]>>, userId: string) => {
  const postsQuery = query(collection(myDb, 'posts'), where('user.id', '==', userId))

  onSnapshot(postsQuery, (snapshot) => {
    const postList = snapshot.docs.map(
      (document) =>
        ({
          id: document.id,
          ...document.data(),
        } as IPost)
    )
    setter(postList)
  })
}

export const setMyCommentsInRealTime = (setter: Dispatch<React.SetStateAction<IComment[]>>, userId: string) => {
  const commentsQuery = query(collection(myDb, 'comments'), where('user.id', '==', userId))

  onSnapshot(commentsQuery, (snapshot) => {
    const commentList = snapshot.docs.map(
      (document) =>
        ({
          id: document.id,
          ...document.data(),
        } as IComment)
    )
    setter(commentList)
  })
}
