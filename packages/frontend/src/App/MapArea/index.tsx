import React, { FC } from 'react'

import useConfigSelector from '../../common/hooks/useConfigSelector'
import { portalerSplash } from '../../common/images'
import PortalMap from '../../PortalMap'
import styles from './styles.module.scss'

interface MapAreaProps {}

const MapArea: FC<MapAreaProps> = () => {
  const config = useConfigSelector()

  return !config.token && !config.isPublic ? (
    <div className={styles.replaceContainer}>
      <img alt="logo" src={portalerSplash} className={styles.logo} />
    </div>
  ) : (
    <PortalMap />
  )
}

export default MapArea
