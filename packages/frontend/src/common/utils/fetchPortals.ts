import { Portal } from '@portaler/types'
import { ConfigState } from '../../reducers/configReducer'

const fetchPortals = (config: ConfigState): Promise<Portal[]> => {
  if (!config.token && !config.isPublic) {
    return Promise.resolve([])
  }

  const headers = new Headers()

  if (config.token) {
    headers.set('Authorization', `Bearer ${config.token}`)
  }

  return fetch(`/api/portal`, {
    headers,
  }).then(async (r: Response) => {
    if (!r.ok) {
      throw new Error('Invalid Login')
    }

    return await r.json()
  })
}

export default fetchPortals
