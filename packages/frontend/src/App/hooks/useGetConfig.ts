import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { ServerConfig } from '@portaler/types'

import fetchler from '../../fetchler'
import { ConfigActionTypes } from '../../reducers/configReducer'
import { ErrorActionTypes } from '../../reducers/errorReducer'

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
    fetchler
      .get<ServerConfig>('/api/config')
      .then((c) => updateConfig(c))
      .catch(() =>
        dispatch({
          type: ErrorActionTypes.ADD,
          error: 'Unable to fetch config',
        })
      )
  }, [updateConfig, dispatch])
}

export default useGetConfig
