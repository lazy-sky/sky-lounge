import { Dispatch } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'

import { myDb } from './myFirebase'

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
