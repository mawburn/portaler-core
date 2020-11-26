import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { ConfigActionTypes } from '../../reducers/configReducer'
import { PortalMapActionTypes } from '../../reducers/portalMapReducer'

const useBadCredentials = (errors: string[]) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (errors.includes('Invalid Login')) {
      dispatch({ type: ConfigActionTypes.CLEARTOKEN })
      dispatch({ type: PortalMapActionTypes.CLEARALL })
    }
  }, [errors, dispatch])
}

export default useBadCredentials
