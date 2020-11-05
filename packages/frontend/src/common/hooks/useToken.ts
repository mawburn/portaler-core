import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../reducers'
import { ConfigActionTypes } from '../../reducers/configReducer'

/**
 * Get and update the token
 *
 * @return [token, updateToken]
 **/
const useToken = (): [string, (token: string) => void] => {
  const token = useSelector((state: RootState) => state.config.token)
  const dispatch = useDispatch()

  const updateToken = useCallback(
    (newToken: string) => {
      dispatch({ type: ConfigActionTypes.TOKEN, token: newToken })
    },
    [dispatch]
  )

  return [token, updateToken]
}

export default useToken
