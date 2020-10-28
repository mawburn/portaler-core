import { useEffect, useState } from 'react'
import { BAD_PASS } from '.'

import { Zone } from '../types'

const useGetZones = (token: string, isPublic?: boolean): Zone[] | null => {
  const [zones, setZones] = useState<Zone[] | null>([])

  useEffect(() => {
    if (token !== BAD_PASS || isPublic) {
      fetch(`/api/zone`, {
        headers: {
          'X-Tebro-Auth': token,
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
