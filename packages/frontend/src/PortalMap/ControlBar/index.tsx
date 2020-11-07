import React, { FC } from 'react'

import { ZoneLight } from '../../ZoneSearch/zoneSearchUtils'
import { Zone } from '../../common/types'
import HomeButton from './HomeButton'
import ReloadMap from './ReloadMap'
import styles from './styles.module.scss'
import ZoneInfo from './ZoneInfo'

interface ControlBarProps {
  handleHome: (zone: ZoneLight) => void
  reloadMap: () => void
  info: Zone | null
}

const ControlBar: FC<ControlBarProps> = ({ handleHome, reloadMap, info }) => (
  <div className={styles.bar}>
    <div>
      <ZoneInfo info={info} />
    </div>
    <div className={styles.controls}>
      <HomeButton handleHome={handleHome} />
      <ReloadMap handleClick={reloadMap} />
    </div>
  </div>
)

export default ControlBar
