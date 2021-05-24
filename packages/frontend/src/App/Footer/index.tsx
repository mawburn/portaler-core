import React from 'react'

import {
  discordLogo,
  githubLogo,
  patreonLogo,
  twitterLogo,
} from '../../common/images'
import styles from './styles.module.scss'
import Twitch from './Twitch'

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.left}>
      <a href="https://agentsofsyn.com" className={styles.aos}>
        <img src="https://agentsofsyn.com/logo-small.png" /> Play TTRPGs? Check
        out AgentsOfSyn.com
      </a>
    </div>
    <div className={styles.middle}>
      <a
        href="https://www.patreon.com/portaler?fan_landing=true"
        target="_blank"
        rel="noopener noreferrer"
        title="Gain the @Patreon Supporter role in Discord PLUS if you're a streamer get your stream posted in #streams when you go live!"
      >
        <img src={patreonLogo} className={styles.patreonLogo} alt="patreon" />
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
