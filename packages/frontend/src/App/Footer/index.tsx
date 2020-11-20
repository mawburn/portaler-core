import React from 'react'
import { discordLogo, githubLogo, twitchLogo } from '../../common/images'

import styles from './styles.module.scss'

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.twitch}>
      {process.env.REACT_APP_TWITCH && (
        <a
          href={process.env.REACT_APP_TWITCH}
          className={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={twitchLogo} className={styles.twitchLogo} alt="twitch" />
          Twitch
        </a>
      )}
    </div>
    <div className={styles.footerRight}>
      <div className={styles.github}>
        <a
          href="https://github.com/Portaler-Zone/portaler-core"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={githubLogo} className={styles.githubLogo} alt="github" />
          GitHub
        </a>
      </div>
      <div className={styles.discord}>
        <a
          href="https://discord.gg/hNjYr86q"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={discordLogo} className={styles.discordLogo} alt="discord" />
        </a>
      </div>
    </div>
  </footer>
)

export default Footer
