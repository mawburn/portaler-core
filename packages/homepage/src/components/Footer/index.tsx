import React, { FC } from 'react'

import styles from './styles.module.scss'

const Footer: FC = () => (
  <div className={styles.footer}>
    © {new Date().getFullYear()}{' '}
    <a href="https://portaler.zone">Portaler.zone</a> |
    <a href="https://mawburn.com" rel="me">
      mawburn.com
    </a>
  </div>
)

export default Footer
