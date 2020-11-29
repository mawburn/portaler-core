import React, { FC } from 'react'

import { Zone } from '@portaler/types'

import { CytoEdgeData } from '../'
import DeleteNode from './DeleteNode'
import HomeButton from './HomeButton'
import ReloadMap from './ReloadMap'
import styles from './styles.module.scss'
import ZoneInfo from './ZoneInfo'

interface ControlBarProps {
  handleHome: (zone: Zone) => void
  reloadMap: () => void
  zone: Zone | null
  edgeData: CytoEdgeData[]
}

const ControlBar: FC<ControlBarProps> = ({
  handleHome,
  reloadMap,
  zone,
  edgeData,
}) => (
  <div className={styles.bar}>
    <div>
      <ZoneInfo zone={zone} />
    </div>
    <div className={styles.controls}>
      <DeleteNode edgeData={edgeData} zoneName={zone?.name} />
      <HomeButton handleHome={handleHome} />
      <ReloadMap handleClick={reloadMap} />
    </div>
  </div>
)

export default ControlBar
