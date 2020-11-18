import React, { FC } from 'react'

import useToken from '../../common/hooks/useToken'
import { portalerSplash } from '../../common/images'
import PortalMap from '../../PortalMap'
import styles from './styles.module.scss'

interface MapAreaProps {}

const MapArea: FC<MapAreaProps> = () => {
  const token = useToken()

  return !token ? (
    <div className={styles.replaceContainer}>
      <img alt="logo" src={portalerSplash} className={styles.logo} />
    </div>
  ) : (
    <PortalMap />
  )
}

export default MapArea
