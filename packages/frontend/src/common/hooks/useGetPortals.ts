import { isEqual } from 'lodash'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Portal } from '@portaler/types'

import { RootState } from '../../reducers'
import { ErrorActionTypes } from '../../reducers/errorReducer'
import { PortalMapActionTypes } from '../../reducers/portalMapReducer'
import fetchPortals from '../utils/fetchPortals'
import useConfigSelector from './useConfigSelector'
import useZoneListSelector from './useZoneListSelector'

const useGetPortals = (): ((force?: boolean) => void) => {
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

  const checkPortals = useCallback(
    async (force: boolean = false) => {
      if ((!!config?.token || config?.isPublic) && zonesLength > 0) {
        const now = new Date()

        if (force || now.getTime() - portalState.lastUpdated > 10000) {
          try {
            const res = await fetchPortals(config)

            updatePortals(res)
          } catch (err) {
            dispatch({ type: ErrorActionTypes.ADD, error: err.message })
          }
        }
      }
    },
    [updatePortals, zonesLength, config, portalState.lastUpdated, dispatch]
  )

  return checkPortals
}

export default useGetPortals
