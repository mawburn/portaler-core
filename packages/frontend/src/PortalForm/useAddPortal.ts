import { useCallback } from 'react'

import useToken from '../common/hooks/useToken'
import { PortalSize } from '../types'

const useAddPortal = (updatePortals: () => void) => {
  const [token] = useToken()

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
      }).then(updatePortals)
    },
    [token, updatePortals]
  )
}

export default useAddPortal
