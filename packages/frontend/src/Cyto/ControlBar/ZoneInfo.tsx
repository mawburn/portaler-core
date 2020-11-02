import { Paper } from '@material-ui/core'
import React, { FC, ReactNode, useMemo } from 'react'
import { Zone } from '../../types'

import styles from './styles.module.scss'

interface ZoneInfoProps {
  info: Zone | null
}

interface Reources {
  [key: string]: number[]
}

const ZoneInfo: FC<ZoneInfoProps> = ({ info }) => {
  const resources = useMemo<ReactNode[] | null>(() => {
    if (!info) {
      return null
    }

    const sources: Reources = {}

    if (info?.resources?.length) {
      info.resources.forEach((r) => {
        if (sources[r.name]) {
          sources[r.name].push(Number(r.tier))
          sources[r.name].sort()
        } else {
          sources[r.name] = [Number(r.tier)]
        }
      })
    }

    const display = Object.keys(sources).map((k) => {
      const len = sources[k].length
      const tiers =
        len === 1
          ? `T${sources[k][0]}`
          : `T${sources[k][0]} - T${sources[k][len - 1]}`
      return (
        <>
          <strong className={styles.fixCase}>{k.toLowerCase()}</strong>: {tiers}
        </>
      )
    })

    return display
  }, [info])

  return !info ? null : (
    <div className={styles.infoContainer}>
      Selected:
      <Paper variant="outlined" className={styles.zoneInfo}>
        <strong>Name:</strong> {info.name}
      </Paper>
      <Paper variant="outlined" className={styles.zoneInfo}>
        <strong>Type:</strong> {info.type}
      </Paper>
      {resources &&
        resources.map((r) => (
          <Paper variant="outlined" className={styles.zoneInfo}>
            {r}
          </Paper>
        ))}
    </div>
  )
}

export default ZoneInfo
