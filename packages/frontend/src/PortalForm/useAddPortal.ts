import { useCallback } from 'react'
import useGetPortals from '../common/hooks/useGetPortals'

import useToken from '../common/hooks/useToken'
import { PortalSize } from '../types'

const useAddPortal = () => {
  const [token] = useToken()
  const checkPortals = useGetPortals()

  return useCallback(
    (
      source: string,
      target: string,
      size: PortalSize,
      hours: number,
      minutes: number
    ) => {
      const body = JSON.stringify({ source, target, size, hours, minutes })

      fetch(`/api/portal`, {
        method: 'POST',
        headers: {
          'X-Tebro-Auth': token,
        },
        body,
      }).then(checkPortals)
    },
    [token, checkPortals]
  )
}

export default useAddPortal
