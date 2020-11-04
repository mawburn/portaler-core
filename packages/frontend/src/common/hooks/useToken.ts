import { Reducer, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../store'

export const BAD_PASS: string = '🙅‍♀️bad password🤦‍♂️'

const tokenStore = (): string => {
  const token = window.localStorage.getItem('token')

  if (token === null) {
    return BAD_PASS
  }

  return token
}

const useToken = (): [string, (token: string) => void] => {
  const [state, setState] = useState<string>(tokenStore())

  const updateToken = useCallback((token: string) => {
    window.localStorage.setItem('token', token)
    setState(token)
  }, [])

  return [state, updateToken]
}

export default useToken
