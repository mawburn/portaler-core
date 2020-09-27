import { DateTime } from 'luxon'
import { useCallback, useEffect, useRef, useState } from 'react'

import { Portal } from '../types'

const fetchPortals = (token: string) =>
  fetch(`/api/portal`, {
    headers: {
      'X-Tebro-Auth': token,
    },
  }).then((r) => r.json())

const useGetPortals = (
  token: string,
  isPublic?: boolean
): { portals: Portal[]; updatePortals: () => void } => {
  const lastUpdate = useRef<DateTime>(DateTime.local())
  const [portals, setPortals] = useState<Portal[]>([])

  useEffect(() => {
    if (token !== '' && isPublic) {
      ;(async () => {
        const res = await fetchPortals(token)
        setPortals(res)
      })()
    }
  }, [token, isPublic])

  const updatePortals = useCallback(async () => {
    const res = await fetchPortals(token)
    lastUpdate.current = DateTime.local()
    setPortals(res)
  }, [token])

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = Math.abs(lastUpdate.current.diffNow().milliseconds)

      if (diff > 10000) {
        updatePortals()
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [updatePortals])

  return { portals, updatePortals }
}

export default useGetPortals
