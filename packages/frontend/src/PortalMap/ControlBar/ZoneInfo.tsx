import React, { FC } from 'react'

import { Paper } from '@material-ui/core'
import { Zone } from '@portaler/types'

import styles from './styles.module.scss'

interface ZoneInfoProps {
  zone: Zone | null
}

const ZoneInfo: FC<ZoneInfoProps> = ({ zone }) =>
  !zone ? null : (
    <div className={styles.infoContainer}>
      Selected:
      <Paper variant="outlined" className={styles.zoneInfo}>
        <strong>Name:</strong> {zone.name}
      </Paper>
      <Paper variant="outlined" className={styles.zoneInfo}>
        <strong>Type:</strong> {zone.type}
      </Paper>
    </div>
  )

export default ZoneInfo
