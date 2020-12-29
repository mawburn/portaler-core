import fetch, { Headers } from 'node-fetch'

const headers = new Headers()

headers.set('Authorization', `Bearer ${process.env.ADMIN_KEY}`)

const fetchServer = (url: string, method: string, body?: string) =>
  fetch(`https://${process.env.API_URL}/api/discord/${url}`, {
    method,
    headers,
    body,
  })

export default fetchServer
