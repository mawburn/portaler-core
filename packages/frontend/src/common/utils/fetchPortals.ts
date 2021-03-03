import { Portal } from '@portaler/types'

import fetchler from '../../fetchler'
import { ConfigState } from '../../reducers/configReducer'

const fetchPortals = (config: ConfigState): Promise<Portal[]> => {
  if (!config.token && !config.isPublic) {
    return Promise.resolve([])
  }

  return fetchler.get(`/api/portal`).then(async (r: Response) => {
    if (!r.ok) {
      throw new Error('Invalid Login')
    }

    return await r.json()
  })
}

export default fetchPortals
