import { useCallback, useEffect, useState } from 'react'

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
    setPortals(res)
  }, [token])

  return { portals, updatePortals }
}

export default useGetPortals
