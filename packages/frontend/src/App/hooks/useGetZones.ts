import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { Zone } from '@portaler/types'

import useConfigSelector from '../../common/hooks/useConfigSelector'
import fetchler from '../../fetchler'
import { ZoneAction, ZoneActionTypes } from '../../reducers/zoneReducer'

const useGetZones = () => {
  const hasHydrated = useRef<boolean>(false)
  const dispatch = useDispatch()
  const config = useConfigSelector()

  useEffect(() => {
    // temporarily disable
    // This probably needs to be reworked to pull a last updated from the backend....
    const loadedState = null //zoneStorage()

    if (loadedState && !hasHydrated.current) {
      hasHydrated.current = true

      dispatch<ZoneAction>({
        type: ZoneActionTypes.HYDRATE,
        fullState: loadedState,
      })
    } else if (!loadedState && (config.token || config.isPublic)) {
      hasHydrated.current = true

      fetchler.get('/api/zone/list').then((json) => {
        dispatch({ type: ZoneActionTypes.ADD, zones: json as Zone[] })
      })
    }
  }, [dispatch, config])
}

export default useGetZones
