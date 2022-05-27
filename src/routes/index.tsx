import { Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { QueryClientProvider, QueryClient } from 'react-query'

import PostsFeed from './PostsFeed'

import styles from './routes.module.scss'

const App = () => {
  const queryClient = new QueryClient()

  // TODO: route
  // - 자유 포스트방:
  // - 자랑방:
  // - 건의사항:
  // - 테스트
  // - 회원가입 및 로그인

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <RecoilRoot>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path='/' element={<PostsFeed />} />
            </Routes>
          </QueryClientProvider>
        </RecoilRoot>
      </main>
    </div>
  )
}

export default App
