import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { CytoEdgeData } from '../'
import useGetPortals from '../../common/hooks/useGetPortals'
import fetchler from '../../fetchler'
import { ErrorActionTypes } from '../../reducers/errorReducer'

const useDeleteZone = () => {
  const checkPortals = useGetPortals()
  const dispatch = useDispatch()

  const deletePortals = useCallback(
    async (edgeData: CytoEdgeData[]) => {
      const portalIds = edgeData.map((e) => e.portalId)

      const res = await fetchler.del('/api/portal', {
        body: { portals: portalIds },
      })

      if (!res.ok) {
        dispatch({ type: ErrorActionTypes.ADD, error: 'Unable to delete Zone' })
      }

      checkPortals(true)
    },
    [checkPortals, dispatch]
  )

  return deletePortals
}

export default useDeleteZone
