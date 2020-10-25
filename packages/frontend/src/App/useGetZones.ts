import { useEffect, useState } from 'react'

import { Zone } from '../types'

const useGetZones = (
  token: string | null,
  isPublic?: boolean
): Zone[] | null => {
  const [zones, setZones] = useState<Zone[] | null>([])

  useEffect(() => {
    if (!token || isPublic) {
      fetch(`/api/zone`, {
        headers: {
          'X-Tebro-Auth': token ?? '',
        },
      })
        .then((r) => {
          if (!r.ok) {
          }

          return r.json()
        })
        .then(setZones)
        .catch((err: Error) => {
          setZones(null)
        })
    }
  }, [token, isPublic])

  return zones
}

export default useGetZones
