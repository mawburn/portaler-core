import React, { FC, useEffect, useState } from 'react'
import { twitchLogo } from '../../../common/images'

import styles from './styles.module.scss'

interface TwitchProps {}

const socket = new WebSocket('wss://goop.portaler.zone/twitch')

const Twitch: FC<TwitchProps> = () => {
  const [isLive, setIsLive] = useState<'yes' | 'no'>('no')

  useEffect(() => {
    const setLive = (e: any) => setIsLive(e.data)

    socket.addEventListener('message', setLive)

    return () => socket.removeEventListener('message', setLive)
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
        {isLive === 'no' ? (
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
