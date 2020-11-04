import { useCallback } from 'react'
import { PortalSize } from '../types'
import useToken from '../utils/hooks/useToken'

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
