import React from 'react'

import { discordLogo, githubLogo } from '../../common/images'
import styles from './styles.module.scss'

// import Twitch from './Twitch'

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.left}></div>
    <div className={styles.middle}></div>
    <div className={styles.right}>
      <div className={styles.twitter}></div>
      <div className={styles.github}>
        <a
          href="https://github.com/Portaler-Zone/portaler-core"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={githubLogo} className={styles.githubLogo} alt="github" />
        </a>
      </div>
      <div className={styles.discord}>
        <a
          href="https://discord.gg/QAjhJ4YNsD"
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
