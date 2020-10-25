import React, { FC } from 'react'
import { ZoneLight } from '../../common/ZoneSearch/zoneSearchUtils'
import HomeButton from './HomeButton'

import styles from './styles.module.scss'

interface ControlBarProps {
  handleHome: (zone: ZoneLight) => void
}

const ControlBar: FC<ControlBarProps> = ({ handleHome }) => (
  <div className={styles.bar}>
    <HomeButton handleHome={handleHome} />
  </div>
)

export default ControlBar
