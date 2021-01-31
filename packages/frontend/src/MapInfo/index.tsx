import cn from 'clsx'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Zone } from '@portaler/types'

import { DEFAULT_ZONE } from '../common/data/constants'
import useZoneInfo from '../common/hooks/useZoneInfo'
import { PortalMapActionTypes } from '../reducers/portalMapReducer'
import ZoneSearch from '../ZoneSearch'
import styles from './styles.module.scss'
import useCurrentZones from './useCurrentZones'

interface InfoString {
  [key: string]: number
}

const toTitleCase = (str: string) =>
  str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  )

const infoCounter = (
  obj: { name: string; tier?: string }[] | null | undefined
): string[] => {
  if (!obj) {
    return []
  }

  const _info: InfoString = {}

  obj.forEach((m) => {
    const name = (!m.tier
      ? toTitleCase(m.name)
      : `${toTitleCase(m.name)} ${m.tier}`
    ).replace(/critter forest red/gi, '')

    _info[name] = _info[name] ? ++_info[name] : 1
  })

  return Object.keys(_info)
    .map((k) => `${k}${_info[k] > 1 ? ` x${_info[k]}` : ''}`)
    .sort()
}

const MapSearch = () => {
  const curZones = useCurrentZones()
  const dispatch = useDispatch()
  const [zoneSearch, setZoneSearch] = useState<Zone>(DEFAULT_ZONE)

  const zone = useZoneInfo()
  const [color, setColor] = useState<string>('')
  const [markers, setMarkers] = useState<string[]>([])
  const [resources, setResources] = useState<string[]>([])
  const [mobs, setMobs] = useState<string[]>([])

  useEffect(() => {
    dispatch({ type: PortalMapActionTypes.CENTER, centerZone: zoneSearch })
  }, [zoneSearch, dispatch])

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
      setResources(infoCounter(zone?.info?.resources))
      setMobs(
        infoCounter(
          zone?.info?.mobs?.filter((m) =>
            m.name.toLowerCase().includes('elite')
          )
        )
      )
    }
  }, [zone])

  return (
    <>
      <ZoneSearch
        zoneList={curZones}
        value={zoneSearch}
        update={setZoneSearch}
        label="Map Search"
      />
      {zone && (
        <div>
          <div
            className={cn(styles.infoRow, {
              [styles.hide]: markers.length === 0,
            })}
          >
            <h2>Markers:</h2>
            <ul>
              {markers.map((m) => (
                <li className={styles.infoList}>{m}</li>
              ))}
            </ul>
          </div>
          <div
            className={cn(styles.infoRow, {
              [styles.hide]: resources.length === 0,
            })}
          >
            <h2>Resources:</h2>
            <ul>
              {resources.map((r) => (
                <li className={styles.infoList}>{r}</li>
              ))}
            </ul>
          </div>
          <div
            className={cn(styles.infoRow, { [styles.hide]: mobs.length === 0 })}
          >
            <h2>Elite Mobs:</h2>
            <ul>
              {mobs.map((m) => (
                <li className={styles.infoList}>{m}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

export default MapSearch
