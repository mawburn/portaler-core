import { useCallback } from 'react'

import { CytoEdgeData } from '../'
import useGetPortals from '../../common/hooks/useGetPortals'
import useToken from '../../common/hooks/useToken'

const useDeleteZone = () => {
  const token = useToken()
  const checkPortals = useGetPortals()

  const deletePortals = useCallback(
    async (edgeData: CytoEdgeData[]) => {
      const portalIds = edgeData.map((e) => e.portalId)
      const headers = new Headers()

      headers.set('Authorization', `Bearer ${token}`)
      headers.set('Content-Type', 'application/json')
      const res = await fetch('/api/portal', {
        headers,
        method: 'DELETE',
        body: JSON.stringify({ portals: portalIds }),
      })

      if (res.ok) {
        checkPortals(true)
      }
    },
    [token, checkPortals]
  )

  return deletePortals
}

export default useDeleteZone
