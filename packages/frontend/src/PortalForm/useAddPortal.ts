import { useCallback } from 'react'

import { PortalPayload } from '@portaler/types'

import useGetPortals from '../common/hooks/useGetPortals'
import fetchler from '../fetchler'

const useAddPortal = () => {
  const checkPortals = useGetPortals()

  return useCallback(
    (portal: PortalPayload) => {
      const body = JSON.stringify(portal)

      fetchler
        .post('/api/portal', {
          body,
        })
        .then(async () => await checkPortals(true))
    },
    [checkPortals]
  )
}

export default useAddPortal
