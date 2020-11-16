import { Portal } from '../types'

const fetchPortals = (token: string | null): Promise<Portal[]> => {
  const headers = new Headers()

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  return fetch(`/api/portal`, {
    headers,
  }).then(async (r: Response) => {
    if (!r.ok) {
      throw new Error('Bad Password')
    }

    return await r.json()
  })
}

export default fetchPortals
