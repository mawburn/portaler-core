import { useEffect, useState } from 'react'

import { Zone } from '../types'

const useGetZones = (token: string, isPublic?: boolean): Zone[] => {
  const [zones, setZones] = useState<Zone[]>([])

  useEffect(() => {
    if (token !== '' || isPublic) {
      fetch(`/api/zone`, {
        headers: {
          'X-Tebro-Auth': token,
        },
      })
        .then((r) => r.json())
        .then(setZones)
    }
  }, [token, isPublic])

  return zones
}

export default useGetZones
