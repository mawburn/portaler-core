import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ConfigActionTypes } from '../../reducers/configReducer'

const useSetToken = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const params = new URLSearchParams(document.location.search.substring(1))
    const urlToken = params.get('token')

    if (urlToken) {
      window.history.replaceState(null, '', window.location.pathname)
      dispatch({ type: ConfigActionTypes.TOKEN, token: urlToken })
    }
  }, [dispatch])
}

export default useSetToken
