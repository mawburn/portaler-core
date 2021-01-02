import { useMemo } from 'react'

import { Zone } from '@portaler/types'

import usePortalsSelector from '../common/hooks/usePortalsSelector'
import useZoneListSelector from '../common/hooks/useZoneListSelector'

const useCurrentZones = (): Zone[] => {
  const zones = useZoneListSelector()
  const portals = usePortalsSelector()

  return useMemo<Zone[]>(() => {
    const setOfPortals = new Set()

    portals.forEach((p) => {
      setOfPortals.add(p.connection[0].toLowerCase())
      setOfPortals.add(p.connection[1].toLowerCase())
    })

    return Array.from(setOfPortals)
      .map((p) => zones.find((z) => z.name.toLowerCase() === p))
      .filter(Boolean) as Zone[]
  }, [zones, portals])
}

export default useCurrentZones
