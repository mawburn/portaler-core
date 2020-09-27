import React, { FC, useMemo, useState } from 'react'

import { Zone } from '../types'
import ZoneSearch from './ZoneSearch'

interface MappingBarProps {
  zones: Zone[]
}

const sorter = (a: string, b: string) =>
  a.toUpperCase().localeCompare(b.toUpperCase())

const MappingBar: FC<MappingBarProps> = ({ zones }) => {
  const [from, setFrom] = useState<string>('')
  const [to, setTo] = useState<string>('')

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

  return (
    <div className="mapping-bar">
      <ZoneSearch label="From" zoneNames={filteredFrom} />
      <ZoneSearch label="To" zoneNames={filteredTo} />
    </div>
  )
}

export default MappingBar
