import cn from 'clsx'
import uniq from 'lodash/uniq'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Marker, Mob, Resource, Zone } from '@portaler/types'
import { romanNumeral } from '@portaler/utils'

import { DEFAULT_ZONE } from '../common/data/constants'
import useZoneInfo from '../common/hooks/useZoneInfo'
import { PortalMapActionTypes } from '../reducers/portalMapReducer'
import ZoneSearch from '../ZoneSearch'
import styles from './styles.module.scss'
import useCurrentZones from './useCurrentZones'

const toTitleCase = (str: string) =>
  str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  )

const markerCounter = (marker: Marker[] | null | undefined): string[] => {
  if (!marker) {
    return []
  }

  const _info: {
    [key: string]: number
  } = {}

  marker.forEach((m) => {
    const name = toTitleCase(m.name)

    _info[name] = _info[name] ? ++_info[name] : 1
  })

  return Object.keys(_info)
    .map((k) => `${k}${_info[k] > 1 ? ` x${_info[k]}` : ''}`)
    .sort()
}

const infoCounter = (info: Resource[] | Mob[] | null | undefined): string[] => {
  if (!info) {
    return []
  }

  const tierArr: { [key: string]: number[] } = {}

  info.forEach((i) => {
    const name = toTitleCase(i.name).replace(/critter forest (red)?/gi, '')
    const tier = Number(romanNumeral(i.tier))

    if (tierArr[name]) {
      tierArr[name].push(tier)
    } else {
      tierArr[name] = [tier]
    }
  })

  return Object.keys(tierArr).map((i) => {
    uniq(tierArr[i]).sort()

    const range =
      tierArr[i].length > 1
        ? `${romanNumeral(tierArr[i][0])} - ${romanNumeral(
            tierArr[i][tierArr[i].length - 1]
          )}`
        : romanNumeral(tierArr[i][0])

    return `${i}: ${range}`
  })
}

const MapSearch = () => {
  const curZones = useCurrentZones()
  const dispatch = useDispatch()
  const [zoneSearch, setZoneSearch] = useState<Zone>(DEFAULT_ZONE)

  const zone = useZoneInfo()
  const [markers, setMarkers] = useState<string[]>([])
  const [resources, setResources] = useState<string[]>([])
  const [mobs, setMobs] = useState<string[]>([])

  useEffect(() => {
    dispatch({ type: PortalMapActionTypes.CENTER, centerZone: zoneSearch })
  }, [zoneSearch, dispatch])

  useEffect(() => {
    if (zone?.info) {
      setMarkers(markerCounter(zone?.info?.markers))
      setResources(infoCounter(zone?.info?.resources))
      setMobs(infoCounter(zone?.info?.mobs))
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
