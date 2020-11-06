import { Portal } from '../types'

const fetchPortals = (token: string): Promise<Portal[]> =>
  fetch(`/api/portal`, {
    headers: {
      'X-Tebro-Auth': token,
    },
  }).then(async (r: Response) => {
    if (!r.ok) {
      throw new Error('Bad Password')
    }

    return await r.json()
  })

export default fetchPortals
