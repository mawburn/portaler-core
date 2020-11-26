import { useSelector } from 'react-redux'

import { Zone } from '@portaler/types'

import { RootState } from '../../reducers'

const useZoneListSelector = (): Zone[] =>
  useSelector((state: RootState) => state.zones.list)

export default useZoneListSelector
