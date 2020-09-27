import { useEffect, useState } from 'react'
import { Zone } from '../types'

const useGetZones = (token: string, isPublic?: boolean) => {
  const [zones, setZones] = useState<Zone[]>([])

  useEffect(() => {
    if (token !== '' || isPublic) {
      ;(async () => {
        const res = await fetch(`/api/zone`, {
          headers: {
            'X-Tebro-Auth': token,
          },
        }).then((r) => r.json())

        setZones(res)
      })()
    }
  }, [token, isPublic])

  return zones
}

export default useGetZones
