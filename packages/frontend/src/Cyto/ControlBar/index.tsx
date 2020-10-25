import React, { FC } from 'react'
import { ZoneLight } from '../../common/ZoneSearch/zoneSearchUtils'
import { Zone } from '../../types'
import HomeButton from './HomeButton'

import styles from './styles.module.scss'
import ZoneInfo from './ZoneInfo'

interface ControlBarProps {
  handleHome: (zone: ZoneLight) => void
  info: Zone | null
}

const ControlBar: FC<ControlBarProps> = ({ handleHome, info }) => (
  <div className={styles.bar}>
    <div className={styles.left}>
      <HomeButton handleHome={handleHome} />
    </div>
    <div className={styles.right}>
      <ZoneInfo info={info} />
    </div>
  </div>
)

export default ControlBar
