import React, { useEffect, useState } from 'react'

import { twitchLogo } from '../../../common/images'
import styles from './styles.module.scss'

const socket = new WebSocket('wss://goop.portaler.zone/twitch')

const Twitch = () => {
  const [isLive, setIsLive] = useState<'yes' | 'no'>('no')

  useEffect(() => {
    const setLive = (e: any) => setIsLive(e.data)

    socket.addEventListener('message', setLive)

    return () => socket.removeEventListener('message', setLive)
  }, [])

  return (
    <div className={styles.twitch}>
      <a
        href="https://twitch.tv/hypnocode"
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
  )
}

export default Twitch
