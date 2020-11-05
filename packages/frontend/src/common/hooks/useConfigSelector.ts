import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../reducers'
import { ConfigActionTypes, ConfigState } from '../../reducers/configReducer'

const useConfigSelector = (): ConfigState => {
  const config = useSelector((state: RootState) => state.config)
  const dispatch = useDispatch()

  const updateConfig = useCallback(
    (publicRead: boolean) => {
      dispatch({ type: ConfigActionTypes.SETPUBLIC, isPublic: publicRead })
    },
    [dispatch]
  )

  useEffect(() => {
    fetch('/api/config')
      .then((r) => r.json())
      .then(updateConfig)
  }, [updateConfig])

  return config
}

export default useConfigSelector
