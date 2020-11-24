import React from 'react'
import { discordLogo, githubLogo } from '../../common/images'
import Twitch from './Twitch'

import styles from './styles.module.scss'

const Footer = () => (
  <footer className={styles.footer}>
    <Twitch />
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
