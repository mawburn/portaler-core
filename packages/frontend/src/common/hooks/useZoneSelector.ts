import { useMemo } from 'react'

import { Zone } from '../../types'
import useZoneListSelector from './useZoneListSelector'

const useZoneSelector = (name: string): Zone | null => {
  const zones = useZoneListSelector()

  return useMemo<Zone | null>(() => {
    const nLow = name.toLowerCase()
    const zone = zones.find((z) => z.name.toLowerCase() === nLow)

    return zone ?? null
  }, [name, zones])
}

export default useZoneSelector
