import React from 'react'

import { discordLogo, githubLogo, twitterLogo } from '../../common/images'
import styles from './styles.module.scss'
import Twitch from './Twitch'

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.left}>
      <Twitch />
    </div>
    <div className={styles.middle}>
      <a
        href="https://www.patreon.com/portaler?fan_landing=true"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://camo.githubusercontent.com/4d19a0333fc372e9b8ca441d067af4fe011e50d1ce7da44975106f493397384c/68747470733a2f2f692e696d6775722e636f6d2f6c79336c616c7a2e706e67"
          className={styles.patreonLogo}
          alt="patreon"
        />
      </a>
    </div>
    <div className={styles.right}>
      <div className={styles.twitter}>
        <a
          href="https://twitter.com/PortalerZone"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={twitterLogo} className={styles.twitterLogo} alt="twitter" />
        </a>
      </div>
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
