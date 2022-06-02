import styles from './submitButton.module.scss'

const SubmitButton = ({ text, onClick }: { text: string; onClick: () => Promise<void> }) => {
  return (
    <button type='button' onClick={onClick} className={styles.submitBtn}>
      {text}
    </button>
  )
}

export default SubmitButton
