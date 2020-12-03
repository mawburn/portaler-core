import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { ServerConfig } from '@portaler/types'

import { ConfigActionTypes } from '../../reducers/configReducer'

const useGetConfig = () => {
  const dispatch = useDispatch()

  const updateConfig = useCallback(
    (c: ServerConfig) => {
      dispatch({
        type: ConfigActionTypes.SETCONFIG,
        isPublic: c.publicRead,
        discordUrl: c.discordUrl,
      })
    },
    [dispatch]
  )

  useEffect(() => {
    fetch('/api/config')
      .then((r) => r.json())
      .then(updateConfig)
  }, [updateConfig])
}

export default useGetConfig
