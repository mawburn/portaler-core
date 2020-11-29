import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { CytoEdgeData } from '../'
import useGetPortals from '../../common/hooks/useGetPortals'
import useToken from '../../common/hooks/useToken'
import { ErrorActionTypes } from '../../reducers/errorReducer'

const useDeleteZone = () => {
  const token = useToken()
  const checkPortals = useGetPortals()
  const dispatch = useDispatch()

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

      if (!res.ok) {
        dispatch({ type: ErrorActionTypes.ADD, error: 'Unable to delete Zone' })
      }

      checkPortals(true)
    },
    [token, checkPortals, dispatch]
  )

  return deletePortals
}

export default useDeleteZone
