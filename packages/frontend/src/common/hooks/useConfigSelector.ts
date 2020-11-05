import { useSelector } from 'react-redux'

import { RootState } from '../../reducers'
import { ConfigState } from '../../reducers/configReducer'

const useConfigSelector = (): ConfigState =>
  useSelector((state: RootState) => state.config)

export default useConfigSelector
