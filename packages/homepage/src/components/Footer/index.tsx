import React, { FC } from 'react'

import githubLogo from '../../images/github.svg'

import styles from './styles.module.scss'

const Footer: FC = () => (
  <div className={styles.footer}>
    © 2020-{new Date().getFullYear()}{' '}
    <a href="https://portaler.zone">Portaler.zone</a> |
    <a href="https://mawburn.com" rel="me">
      mawburn.com
    </a>
    |
    <div className={styles.github}>
      <a href="https://github.com/Portaler-Zone/portaler-core">
        <img src={githubLogo} className={styles.githubLogo} alt="github" />
        GitHub
      </a>
    </div>
  </div>
)

export default Footer
