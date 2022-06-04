import { MeerkatIcon } from 'assets/svgs'
import { Dispatch, ReactNode, useMemo } from 'react'
import { createPortal } from 'react-dom'

import styles from './welcomePopup.module.scss'

interface IPortal {
  children: ReactNode
  elementId: string
}

interface IWelcomePopup {
  visible: boolean
  setVisible: Dispatch<React.SetStateAction<boolean>>
}

// 나중에 모달, 팝업이 또 필요한 경우가 생기면 분리
const Portal = ({ children, elementId }: IPortal) => {
  const rootElement = useMemo(() => document.getElementById(elementId), [elementId])
  return createPortal(children, rootElement!)
}

const WelcomePopup = ({ visible, setVisible }: IWelcomePopup) => {
  const handleCloseClick = () => {
    setVisible(false)
  }
  const handleNeverClick = () => {
    localStorage.setItem('skyLoungeWelcome', 'no')
    setVisible(false)
  }

  return (
    <Portal elementId='popup'>
      {visible && (
        <div className={styles.popup}>
          <div className={styles.wrapper}>
            <h3>개발자들의 쉼터 Sky Lounge에 오신 것을 환영합니다!</h3>
            <a href='https://github.com/lazy-sky' target='_blank' rel='noreferrer'>
              <MeerkatIcon />
            </a>
            <p>Sky Lounge에서 할 수 있는 것!</p>
            <ul>
              <li>⭐프로젝트 자랑⭐</li>
              <li>⭐스터디 모집⭐</li>
              <li>⭐동료 모집⭐</li>
              <li>⭐각종 홍보⭐</li>
              <li>⭐모임 공지⭐</li>
              <li>⭐익명 채팅⭐</li>
              <li>⭐챌린지⭐</li>
            </ul>
            <p>문의사항 및 요구사항은 알아서 연락주세요! 계속 개발중입니다.</p>
            <div className={styles.footer}>
              <div>
                <a href='https://github.com/lazy-sky' target='_blank' rel='noreferrer'>
                  @lazy-sky
                </a>
              </div>
              <div>ⓒ 2022. @lazy-sky. all rights reserved.</div>
            </div>
            <div className={styles.closeBtns}>
              <button type='button' onClick={handleNeverClick}>
                다시 보지 않기
              </button>
              <button type='button' onClick={handleCloseClick}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </Portal>
  )
}

export default WelcomePopup
