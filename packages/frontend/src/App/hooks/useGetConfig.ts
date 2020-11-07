import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ConfigActionTypes } from '../../reducers/configReducer'

const useGetConfig = () => {
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
}

export default useGetConfig
