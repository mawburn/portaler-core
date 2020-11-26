import { useCallback } from 'react'

import { PortalPayload } from '@portaler/types'

import useGetPortals from '../common/hooks/useGetPortals'
import useToken from '../common/hooks/useToken'

const useAddPortal = () => {
  const token = useToken()
  const checkPortals = useGetPortals()

  return useCallback(
    (portal: PortalPayload) => {
      const body = JSON.stringify(portal)

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
