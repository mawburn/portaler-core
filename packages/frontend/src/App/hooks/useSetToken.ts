import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ConfigActionTypes } from '../../reducers/configReducer'
import { ErrorActionTypes } from '../../reducers/errorReducer'

const useSetToken = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const params = new URLSearchParams(document.location.search.substring(1))
    const urlToken = params.get('token')

    if (urlToken) {
      window.history.replaceState(null, '', window.location.pathname)

      if (urlToken !== 'invalid') {
        dispatch({ type: ConfigActionTypes.TOKEN, token: urlToken })
      } else {
        dispatch({ type: ErrorActionTypes.ADD, error: 'Invalid Login' })
      }
    }
  }, [dispatch])
}

export default useSetToken
