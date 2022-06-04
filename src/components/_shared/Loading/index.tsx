import ReactLoading, { LoadingType } from 'react-loading'

import styles from './loading.module.scss'

interface ILoading {
  type: LoadingType
  message?: string
}

const Loading = ({ type, message }: ILoading) => {
  return (
    <div className={styles.loading}>
      <ReactLoading type={type} color='#a3e9ff' width='30%' />
      {message}
    </div>
  )
}

export default Loading
