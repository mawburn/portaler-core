import { Portal } from '@portaler/types'

import fetchler from '../../fetchler'
import { ConfigState } from '../../reducers/configReducer'

const fetchPortals = async (config: ConfigState): Promise<Portal[]> => {
  if (!config.token && !config.isPublic) {
    return Promise.resolve([])
  }

  return await fetchler.get<Portal[]>(`/api/portal`)
}

export default fetchPortals
