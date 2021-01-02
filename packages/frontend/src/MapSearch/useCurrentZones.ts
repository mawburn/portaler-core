import { useMemo } from 'react'

import { Zone } from '@portaler/types'

import usePortalsSelector from '../common/hooks/usePortalsSelector'
import useZoneListSelector from '../common/hooks/useZoneListSelector'

const useCurrentZones = (): Zone[] => {
  const zones = useZoneListSelector()
  const portals = usePortalsSelector()

  return useMemo<Zone[]>(() => {
    const zoneList: Zone[] = []
    const setOfPortals = new Set()

    portals.forEach((p) => {
      setOfPortals.add(p.connection[0].toLowerCase())
      setOfPortals.add(p.connection[1].toLowerCase())
    })

    Array.from(setOfPortals).forEach((p) => {
      const zone = zones.find((z) => z.name.toLowerCase() === p)

      if (zone) {
        zoneList.push(zone)
      }
    })

    return zoneList
  }, [zones, portals])
}

export default useCurrentZones
