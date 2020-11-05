import { useCallback, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import useConfigSelector from '../../common/hooks/useConfigSelector'
import useToken from '../../common/hooks/useToken'
import useZoneListSelector from '../../common/hooks/useZoneListSelector'
import { BAD_PASS } from '../../reducers/configReducer'
import { PortalMapActionTypes } from '../../reducers/portalMapReducer'
import { Portal } from '../../types'

const fetchPortals = (token: string): Promise<Portal[]> =>
  fetch(`/api/portal`, {
    headers: {
      'X-Tebro-Auth': token,
    },
  }).then(async (r: Response) => {
    if (!r.ok) {
      throw new Error('Bad Password')
    }

    return await r.json()
  })

const useGetPortals = () => {
  const dispatch = useDispatch()
  const zones = useZoneListSelector()
  const zonesLength = zones.length

  const [token] = useToken()
  const config = useConfigSelector()
  const lastUpdate = useRef<Date>(new Date())

  const updatePortals = useCallback(
    (portals: Portal[]) => {
      dispatch({ type: PortalMapActionTypes.UPDATEMAP, portals })
    },
    [dispatch]
  )

  const checkPortals = useCallback(async () => {
    if (token !== BAD_PASS) {
      const res = await fetchPortals(token)
      lastUpdate.current = new Date()
      updatePortals(res)
    }
  }, [token, updatePortals])

  // initial fetch
  useEffect(() => {
    if (
      (token !== BAD_PASS || config?.isPublic) &&
      zonesLength &&
      zonesLength > 0
    ) {
      checkPortals()
    }
  }, [token, zonesLength, config?.isPublic, checkPortals])

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const diff = now.getTime() - lastUpdate.current.getTime()

      if (diff > 10000) {
        checkPortals()
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [checkPortals])
}

export default useGetPortals
