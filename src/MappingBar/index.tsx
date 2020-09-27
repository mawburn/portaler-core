import './MappingBar.scss'

import React, { FC, useEffect, useMemo, useRef, useState } from 'react'

import { PortalSize, Zone } from '../types'
import ZoneSearch from './ZoneSearch'
import PortalSizeSelector from './PortalSizeSelector'

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
  const [portalSize, setPortalSize] = useState<number>(2)

  const zoneNames = useMemo<string[]>(
    () => zones.map((n) => n.name).sort(sorter),
    [zones]
  )

  const filteredFrom = useMemo<string[]>(
    () => zoneNames.filter((z) => !to?.includes(z)),
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
      <div className="row">
        <ZoneSearch
          value={from}
          update={setFrom}
          label="From"
          zoneNames={filteredFrom}
        />
      </div>
      <div className="row">
        <ZoneSearch
          value={to}
          update={setTo}
          label="To"
          zoneNames={filteredTo}
        />
      </div>
      <div className="row">
        <PortalSizeSelector size={portalSize} update={setPortalSize} />
      </div>
    </div>
  )
}

export default MappingBar
