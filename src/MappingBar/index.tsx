import './MappingBar.scss'

import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { PortalSize, Zone } from '../types'
import PortalCount from './PortalCount'
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
  const [to, setTo] = useState<(string | null)[]>(new Array<string>(7))
  const [portalCount, setPortalCount] = useState<number>(1)

  const zoneNames = useMemo<string[]>(
    () => zones.map((n) => n.name).sort(sorter),
    [zones]
  )

  const filteredFrom = useMemo<string[]>(
    () => zoneNames.filter((z) => !to?.includes(z)),
    [to, zoneNames]
  )
  const filteredTo = useMemo<string[]>(
    () => zoneNames.filter((z) => z !== from && !to.includes(z)),
    [from, zoneNames, to]
  )

  useEffect(() => {
    if (fromId !== oldFromId.current) {
      setFrom(fromId)
      oldFromId.current = fromId
    }
  }, [fromId, setFrom])

  const updateToPortal = useCallback((newVal: string | null, index: number) => {
    setTo((valArr) => {
      const newValArr = [...valArr]
      newValArr[index] = newVal

      return newValArr
    })
  }, [])

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
        <PortalCount selected={portalCount} update={setPortalCount} />
      </div>

      {[...Array(portalCount)].map((_, i) => (
        <div className="row" key={`zone-to-${i}`}>
          <ZoneSearch
            value={to[i - 1]}
            update={(newVal) => updateToPortal(newVal, i - 1)}
            label="To"
            zoneNames={filteredTo}
          />
        </div>
      ))}
    </div>
  )
}

export default MappingBar
