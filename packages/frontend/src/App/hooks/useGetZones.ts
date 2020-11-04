import { DateTime } from 'luxon'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Zone } from '../../types'
import useToken, { BAD_PASS } from '../../utils/hooks/useToken'
import { ErrorActionTypes } from '../errorReducer'
import { ZoneAction, ZoneActionTypes, ZoneState } from '../zoneReducer'
import useGetConfig from './useGetConfig'

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
  const dispatch = useDispatch()
  const config = useGetConfig()
  const [token] = useToken()

  useEffect(() => {
    const loadedState = zoneStorage()

    if (loadedState) {
      dispatch<ZoneAction>({
        type: ZoneActionTypes.HYDRATE,
        fullState: loadedState,
      })
    } else if (token !== BAD_PASS || config?.publicRead) {
      fetch(`/api/zone`, {
        headers: {
          'X-Tebro-Auth': token,
        },
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
  }, [dispatch, token, config?.publicRead])
}

export default useGetZones
