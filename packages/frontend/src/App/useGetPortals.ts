import { useCallback, useEffect, useRef, useState } from 'react'
import { BAD_PASS } from '.'

import { Portal } from '../types'

const fetchPortals = (token: string): Promise<Portal[]> =>
  fetch(`/api/portal`, {
    headers: {
      'X-Tebro-Auth': token,
    },
  }).then(async (r: Response) => {
    if (!r.ok) {
      throw new Error('Bad Password')
    }

    return await r.json()
  })

const useGetPortals = (
  token: string,
  zonesLength?: number | null,
  isPublic?: boolean
): [Portal[] | null, () => void] => {
  const lastUpdate = useRef<Date>(new Date())
  const [portals, setPortals] = useState<Portal[] | null>([])

  useEffect(() => {
    if ((token !== BAD_PASS || isPublic) && zonesLength && zonesLength > 0) {
      fetchPortals(token)
        .then(setPortals)
        .catch(() => {
          setPortals(null)
        })
    }
  }, [token, zonesLength, isPublic])

  const updatePortals = useCallback(async () => {
    const res = await fetchPortals(token)
    lastUpdate.current = new Date()
    setPortals(res)
  }, [token])

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const diff = now.getTime() - lastUpdate.current.getTime()

      if (diff > 10000) {
        updatePortals()
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [updatePortals])

  return [portals, updatePortals]
}

export default useGetPortals
