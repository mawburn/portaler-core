import React, { useEffect, useState } from 'react'

import { twitchLogo } from '../../common/images'
import styles from './styles.module.scss'

const isHypno = process.env.REACT_APP_TWITCH?.toLowerCase().includes(
  'hypnocode'
)

const socket = isHypno ? new WebSocket('wss://goop.portaler.zone/twitch') : null

const Twitch = () => {
  const [isLive, setIsLive] = useState<'yes' | 'no'>('no')

  useEffect(() => {
    const setLive = (e: any) => setIsLive(e.data)

    if (isHypno) {
      socket?.addEventListener('message', setLive)
    }

    return () => socket?.removeEventListener('message', setLive)
  }, [])

  return process.env.REACT_APP_TWITCH ? (
    <div className={styles.twitch}>
      <a
        href={process.env.REACT_APP_TWITCH}
        className={styles.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={twitchLogo} className={styles.twitchLogo} alt="twitch" />
        {isLive !== 'yes' ? (
          'Twitch'
        ) : (
          <div className={styles.fadeIn}>
            Online Now
            <div className={styles.container}>
              <div className={styles.ledBox}>
                <div className={styles.ledGreen} />
              </div>
            </div>
          </div>
        )}
      </a>
    </div>
  ) : null
}

export default Twitch
