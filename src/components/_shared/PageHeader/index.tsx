import BackButton from './BackButton'
import styles from './pageHeader.module.scss'

interface IPageHeader {
  title: string
  hasBackBtn?: boolean
  children?: React.ReactNode
}

const PageHeader = ({ title, hasBackBtn, children }: IPageHeader) => {
  return (
    <header className={styles.header}>
      <div className={styles.backBtn}>{hasBackBtn && <BackButton />}</div>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.children}>{children}</div>
    </header>
  )
}

export default PageHeader
