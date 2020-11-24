import React from 'react'

import styles from './styles.module.scss'

const isDemo = window.location.host.split('.')[0] === 'demo'

const DemoBar = () =>
  isDemo ? (
    <div className={styles.demoMode}>
      The demo server will reset every 4 hours.
    </div>
  ) : null

export default DemoBar
