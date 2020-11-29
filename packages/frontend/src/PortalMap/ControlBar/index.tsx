import React, { FC } from 'react'

import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { Zone } from '@portaler/types'

import useDeleteZone from '../hooks/useDeleteZone'
import HomeButton from './HomeButton'
import ReloadMap from './ReloadMap'
import styles from './styles.module.scss'
import ZoneInfo from './ZoneInfo'
import { CytoEdgeData } from '..'

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
}) => {
  const deleteZone = useDeleteZone()

  return (
    <div className={styles.bar}>
      <div>
        <ZoneInfo zone={zone} />
      </div>
      <div className={styles.controls}>
        {edgeData.length && (
          <div className={styles.control}>
            <IconButton
              onClick={() => deleteZone(edgeData)}
              aria-label="home"
              title="focus home"
            >
              <DeleteIcon fontSize="large" color="secondary" />
            </IconButton>
          </div>
        )}
        <HomeButton handleHome={handleHome} />
        <ReloadMap handleClick={reloadMap} />
      </div>
    </div>
  )
}

export default ControlBar
