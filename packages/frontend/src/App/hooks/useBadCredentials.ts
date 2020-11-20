import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../reducers'
import { ConfigActionTypes } from '../../reducers/configReducer'
import { PortalMapActionTypes } from '../../reducers/portalMapReducer'

const useBadCredentials = (): [boolean, () => void] => {
  const [badPass, setBadPass] = useState<boolean>(false)
  const errors = useSelector((state: RootState) => state.errors)
  const dispatch = useDispatch()

  useEffect(() => {
    if (errors.includes('Invalid Login')) {
      setBadPass(true)
      dispatch({ type: ConfigActionTypes.CLEARTOKEN })
      dispatch({ type: PortalMapActionTypes.CLEARALL })
    }
  }, [errors, dispatch])

  const reset = useCallback(() => {
    setBadPass(false)
  }, [])

  return [badPass, reset]
}

export default useBadCredentials
