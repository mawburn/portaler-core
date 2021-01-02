import { useSelector } from 'react-redux'

import { Portal } from '@portaler/types'

import { RootState } from '../../reducers'

const usePortalsSelector = (): Portal[] =>
  useSelector((state: RootState) => state.portalMap.portals)

export default usePortalsSelector
