import PageHeader from 'components/_shared/PageHeader'
import PostsFeed from 'routes/PostsFeed'

const Home = () => {
  return (
    <>
      <PageHeader title='Sky Lounge' />
      <PostsFeed />
    </>
  )
}

export default Home
