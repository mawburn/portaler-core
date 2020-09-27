import React, { FC, useEffect, useMemo, useRef, useState } from 'react'

import { PortalSize, Zone } from '../types'
import ZoneSearch from './ZoneSearch'

interface MappingBarProps {
  zones: Zone[]
  fromId: string | null
  addPortal: (
    source: string,
    target: string,
    size: PortalSize,
    hours: number,
    minutes: number
  ) => void
}

const sorter = (a: string, b: string) =>
  a.toUpperCase().localeCompare(b.toUpperCase())

const MappingBar: FC<MappingBarProps> = ({ zones, fromId, addPortal }) => {
  const oldFromId = useRef<string | null>(fromId)
  const [from, setFrom] = useState<string | null>(null)
  const [to, setTo] = useState<string | null>(null)

  const zoneNames = useMemo<string[]>(
    () => zones.map((n) => n.name).sort(sorter),
    [zones]
  )

  const filteredFrom = useMemo<string[]>(
    () => zoneNames.filter((z) => z !== to),
    [to, zoneNames]
  )
  const filteredTo = useMemo<string[]>(
    () => zoneNames.filter((z) => z !== from),
    [from, zoneNames]
  )

  useEffect(() => {
    if (fromId !== oldFromId.current) {
      setFrom(fromId)
      oldFromId.current = fromId
    }
  }, [fromId, setFrom])

  return (
    <div className="mapping-bar">
      <ZoneSearch
        value={from}
        update={setFrom}
        label="From"
        zoneNames={filteredFrom}
      />
      <ZoneSearch value={to} update={setTo} label="To" zoneNames={filteredTo} />
    </div>
  )
}

export default MappingBar
