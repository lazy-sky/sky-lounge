import { useNavigate } from 'react-router-dom'

import { ArrowLeftIcon } from 'assets/svgs'

const BackButton = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(-1)
  }

  return (
    <button type='button' onClick={handleClick}>
      <ArrowLeftIcon />
    </button>
  )
}

export default BackButton
