import { useCallback } from 'react'

import { PortalPayload } from '@portaler/types'

import useGetPortals from '../common/hooks/useGetPortals'
import fetchler from '../fetchler'

const useAddPortal = () => {
  const checkPortals = useGetPortals()

  return useCallback(
    async (portal: PortalPayload) => {
      await fetchler.post('/api/portal', { ...portal })

      await checkPortals(true)
    },
    [checkPortals]
  )
}

export default useAddPortal
