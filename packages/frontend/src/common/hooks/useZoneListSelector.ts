import { useSelector } from 'react-redux'

import { RootState } from '../../reducers'
import { Zone } from '../types'

const useZoneListSelector = (): Zone[] =>
  useSelector((state: RootState) => state.zones.list)

export default useZoneListSelector
