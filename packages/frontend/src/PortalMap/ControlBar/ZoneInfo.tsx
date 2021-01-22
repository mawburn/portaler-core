import React, { useEffect, useState } from 'react'

import { Paper } from '@material-ui/core'

import useZoneInfo from '../../common/hooks/useZoneInfo'
import styles from './styles.module.scss'

interface InfoString {
  [key: string]: number
}

const infoCounter = (
  obj: { name: string; tier?: string }[] | null | undefined
): string | null => {
  if (!obj) {
    return null
  }

  const _info: InfoString = {}

  obj.forEach((m) => {
    _info[m.name] = _info[m.name] ? ++_info[m.name] : 1
  })

  return Object.keys(_info)
    .map((k) => `${k}${_info[k] > 1 ? ` x${_info[k]}` : ''}`)
    .sort()
    .join(', ')
}

const ZoneInfo = () => {
  const zone = useZoneInfo()
  const [color, setColor] = useState<string>('')
  const [markers, setMarkers] = useState<string | null>(null)
  const [resources] = useState<string | null>(null)
  const [mobs] = useState<string | null>(null)

  useEffect(() => {
    if (zone?.color.includes('road')) {
      const colorStr = ['Road']

      if (zone?.color.includes('ho')) {
        colorStr.push('Hideout')
      }

      if (zone?.isDeep) {
        colorStr.unshift('Deep')
      }

      setColor(colorStr.join(' '))
    } else {
      setColor(zone?.color ?? '')
    }

    if (zone?.info) {
      setMarkers(infoCounter(zone?.info?.markers))
      //setResources(infoCounter(zone?.info?.resources))
      //setMobs(infoCounter(zone?.info?.mobs))
    }
  }, [zone])

  return !zone ? null : (
    <div className={styles.infoContainer}>
      <Paper variant="outlined" className={styles.zoneInfo}>
        {zone.name} - <span className={styles.cap}>{color}</span>{' '}
        {zone.color !== 'city' ? zone.tier : null}
      </Paper>
      {markers && (
        <>
          Markers:
          <Paper variant="outlined" className={styles.zoneInfo}>
            {markers}
          </Paper>
        </>
      )}
      {resources && (
        <>
          Resources:
          <Paper variant="outlined" className={styles.zoneInfo}>
            {resources}
          </Paper>
        </>
      )}
      {mobs && (
        <>
          Resources:
          <Paper variant="outlined" className={styles.zoneInfo}>
            {mobs}
          </Paper>
        </>
      )}
    </div>
  )
}

export default ZoneInfo
