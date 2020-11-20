import { useSelector } from 'react-redux'

import { RootState } from '../../reducers'

/**
 * Get and update the token
 *
 * @return token
 **/
const useToken = (): string | null =>
  useSelector((state: RootState) => state.config.token)

export default useToken
