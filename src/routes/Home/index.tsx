import { useState } from 'react'
import { useMount } from 'react-use'

import WelcomePopup from './WelcomePopup'
import PageHeader from 'components/_shared/PageHeader'
import PostsFeed from './PostsFeed'

const Home = () => {
  const [popUpVisible, setPopUpVisible] = useState(false)

  useMount(() => {
    const isVisited = localStorage.getItem('skyLoungeWelcome')
    if (isVisited) return
    setPopUpVisible(true)
  })

  return (
    <>
      {popUpVisible && <WelcomePopup visible={popUpVisible} setVisible={setPopUpVisible} />}
      <PageHeader title='Sky Lounge' />
      <PostsFeed />
    </>
  )
}

export default Home
