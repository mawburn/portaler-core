import { useCallback } from 'react'

import useGetPortals from '../common/hooks/useGetPortals'
import useToken from '../common/hooks/useToken'
import { PortalSize } from '@portaler/types'

const useAddPortal = () => {
  const token = useToken()
  const checkPortals = useGetPortals()

  return useCallback(
    (
      source: string,
      target: string,
      size: PortalSize,
      hours: number,
      minutes: number
    ) => {
      const endpoints = [source, target].sort()

      const body = JSON.stringify({
        source: endpoints[0],
        target: endpoints[1],
        size,
        hours,
        minutes,
      })

      fetch(`/api/portal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body,
      }).then(() => checkPortals(true))
    },
    [token, checkPortals]
  )
}

export default useAddPortal
