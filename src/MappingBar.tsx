import React, { FC, useMemo } from 'react'
import { Zone } from './types'
import ZoneSearch from './ZoneSearch'

interface MappingBarProps {
  zones: Zone[]
}

const MappingBar: FC<MappingBarProps> = ({ zones }) => {
  const zoneNames = useMemo<string[]>(() => zones.map((n) => n.name), [zones])

  return (
    <div className="mapping-bar">
      <ZoneSearch />
    </div>
  )
}

export default MappingBar
