import { Portal } from '@portaler/types'

const fetchPortals = (token: string | null): Promise<Portal[]> => {
  if (!token) {
    return Promise.resolve([])
  }

  const headers = new Headers()

  headers.set('Authorization', `Bearer ${token}`)

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
