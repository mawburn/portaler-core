import { DateTime } from 'luxon'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import useConfigSelector from '../../common/hooks/useConfigSelector'
import useToken from '../../common/hooks/useToken'
import { Zone } from '../../common/types'
import { ErrorActionTypes } from '../../reducers/errorReducer'
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

    if (now.weekday !== 1 && now.diff(lastUpdated, 'days').as('days') < 3) {
      return zoneState
    }
  }

  return null
}

const useGetZones = () => {
  const hasHydrated = useRef<boolean>(false)
  const dispatch = useDispatch()
  const config = useConfigSelector()
  const token = useToken()

  useEffect(() => {
    const loadedState = zoneStorage()

    if (loadedState && !hasHydrated.current) {
      hasHydrated.current = true

      dispatch<ZoneAction>({
        type: ZoneActionTypes.HYDRATE,
        fullState: loadedState,
      })
    } else if (!loadedState && token) {
      hasHydrated.current = true
      const headers = new Headers()

      headers.set('Authorization', `Bearer ${token}`)

      fetch(`/api/zone`, {
        headers,
      })
        .then((r) => {
          if (!r.ok) {
            throw new Error('Unable to fetch zones')
          }

          return r.json()
        })
        .then((json) => {
          dispatch({ type: ZoneActionTypes.ADD, zones: json as Zone[] })
        })
        .catch((err: Error) => {
          dispatch({ type: ErrorActionTypes.ADD, error: err.message })
        })
    }
  }, [dispatch, token, config])
}

export default useGetZones
