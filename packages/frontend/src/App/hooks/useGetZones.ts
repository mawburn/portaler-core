import { DateTime } from 'luxon'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { Zone } from '@portaler/types'

import useConfigSelector from '../../common/hooks/useConfigSelector'
import fetchler from '../../fetchler'
import {
  ZoneAction,
  ZoneActionTypes,
  ZoneState,
} from '../../reducers/zoneReducer'

const zoneStorage = (): ZoneState | null => {
  const zonesString: string | null = window.localStorage.getItem('zones')

  if (zonesString) {
    const zoneState: ZoneState = JSON.parse(zonesString)
    const now = DateTime.utc()
    const lastUpdated = DateTime.fromMillis(zoneState.lastUpdated)

    if (now.diff(lastUpdated, 'hours').as('hours') < 6) {
      return zoneState
    }
  }

  return null
}

const useGetZones = () => {
  const hasHydrated = useRef<boolean>(false)
  const dispatch = useDispatch()
  const config = useConfigSelector()

  useEffect(() => {
    const loadedState = zoneStorage()

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
