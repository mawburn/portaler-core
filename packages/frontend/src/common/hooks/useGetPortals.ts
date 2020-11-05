import { isEqual } from 'lodash'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../reducers'

import { BAD_PASS } from '../../reducers/configReducer'
import { PortalMapActionTypes } from '../../reducers/portalMapReducer'
import { Portal } from '../../types'
import fetchPortals from '../utils/fetchPortals'
import useConfigSelector from './useConfigSelector'
import useZoneListSelector from './useZoneListSelector'

const useGetPortals = (): (() => void) => {
  const dispatch = useDispatch()
  const zones = useZoneListSelector()
  const zonesLength = zones.length
  const portalState = useSelector((state: RootState) => state.portalMap)

  const config = useConfigSelector()

  const updatePortals = useCallback(
    (newPortals: Portal[]) => {
      if (!isEqual(portalState.portals, newPortals)) {
        dispatch({ type: PortalMapActionTypes.UPDATEMAP, portals: newPortals })
      }
    },
    [dispatch, portalState.portals]
  )

  const checkPortals = useCallback(async () => {
    if ((config?.token !== BAD_PASS || config?.isPublic) && zonesLength > 0) {
      const now = new Date()

      if (now.getTime() - portalState.lastUpdated > 10000) {
        const res = await fetchPortals(config?.token)

        updatePortals(res)
      }
    }
  }, [updatePortals, zonesLength, config, portalState.lastUpdated])

  return checkPortals
}

export default useGetPortals
