import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import useConfigSelector from '../../common/hooks/useConfigSelector'
import useGetPortals from '../../common/hooks/useGetPortals'
import fetchPortals from '../../common/utils/fetchPortals'
import { BAD_PASS } from '../../reducers/configReducer'
import { ErrorActionTypes } from '../../reducers/errorReducer'
import { PortalMapActionTypes } from '../../reducers/portalMapReducer'

const useGetPortalTimer = () => {
  const initialLoad = useRef<boolean>(true)
  const checkPortals = useGetPortals()
  const checkPortalsRef = useRef<() => void>(checkPortals)
  const dispatch = useDispatch()
  const config = useConfigSelector()

  useEffect(() => {
    if (
      (config?.token !== BAD_PASS || config?.isPublic) &&
      initialLoad.current
    ) {
      fetchPortals(config.token)
        .then((portals) => {
          dispatch({ type: PortalMapActionTypes.UPDATEMAP, portals })
          initialLoad.current = false
        })
        .catch((err) =>
          dispatch({ type: ErrorActionTypes.ADD, error: err.message })
        )
    }
  }, [config, dispatch])

  useEffect(() => {
    checkPortalsRef.current = checkPortals
  }, [checkPortals])

  useEffect(() => {
    const interval = setInterval(() => {
      checkPortalsRef.current()
    }, 30000)

    return () => {
      clearInterval(interval)
    }
  }, [])
}

export default useGetPortalTimer
