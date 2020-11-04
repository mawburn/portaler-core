import { useSelector } from 'react-redux'
import { RootState } from '../../store'

const useZonesSelector = () =>
  useSelector((state: RootState) => state.zones.list)

export default useZonesSelector
