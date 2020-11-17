import React, { FC } from 'react'
import useToken from '../../common/hooks/useToken'
import LoginButton from '../../LoginButton'
import PortalMap from '../../PortalMap'

import styles from './styles.module.scss'

interface MapAreaProps {}

const MapArea: FC<MapAreaProps> = () => {
  const token = useToken()

  return !token ? (
    <div className={styles.replaceContainer}>
      <h1>
        <img
          alt="logo"
          src={`${process.env.PUBLIC_URL}/android-chrome-192x192.png`}
          className={styles.logo}
        />
        Portaler
      </h1>
    </div>
  ) : (
    <PortalMap />
  )
}

export default MapArea
