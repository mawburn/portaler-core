import { DateTime } from 'luxon'
import fetch, { Headers, RequestInit } from 'node-fetch'

type HTTPMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface RateLimit {
  'X-RateLimit-Limit': number
  'X-RateLimit-Remaining': number
  'X-RateLimit-Reset': number
}

const rateLimit: RateLimit = {
  'X-RateLimit-Limit': 10,
  'X-RateLimit-Remaining': 10,
  'X-RateLimit-Reset': DateTime.utc().toSeconds(),
}

let running = 0
let waiting = 0

/**
 * Wait until the ratelimit is reset
 */
const waitReset = () =>
  new Promise((resolve) => {
    ++waiting

    setInterval(() => {
      if (DateTime.utc().toSeconds() > rateLimit['X-RateLimit-Reset']) {
        --waiting
        return resolve()
      }
    }, 10)
  })

/**
 * Wait until we have free space in the queue
 */
const waitQueue = () =>
  new Promise((resolve) => {
    ++waiting

    setInterval(() => {
      if (
        running < rateLimit['X-RateLimit-Remaining'] ||
        DateTime.utc().toSeconds() > rateLimit['X-RateLimit-Reset']
      ) {
        --waiting
        return resolve()
      }
    }, 10)
  })

/**
 * Wait until there is nothing waiting
 * NOTE: this might not be a good idea 🤔
 */
const waitForWaiting = () =>
  new Promise((resolve) => {
    setInterval(() => {
      if (waiting === 0) {
        return resolve()
      }
    }, 10)
  })

const headers = new Headers()
headers.append('Accept', 'application/json')
headers.append('Authorization', `Bot ${process.env.DISCORD_BOT_TOKEN}`)

/**
 * Automatically injects the api url, auth header, and handles rate limiting
 * @param  endpoint the endpoint to hit minus the api url
 * @param  {HTTPMethods='GET'} method defaults to 'GET'
 */
const fetcher = async (endpoint: string, method: HTTPMethods = 'GET') => {
  if (waiting !== 0) {
    await waitForWaiting()
  }

  if (rateLimit['X-RateLimit-Remaining'] === 0) {
    await waitReset()
  }

  if (running === rateLimit['X-RateLimit-Remaining']) {
    await waitQueue()
  }

  ++running

  const opts: RequestInit = {
    method,
    headers,
  }

  return await fetch(`${process.env.DISCORD_API}${endpoint}`, opts)
    .then((res) => {
      if (res.headers.has('X-RateLimit-Limit')) {
        rateLimit['X-RateLimit-Limit'] = Number(
          res.headers.get('X-RateLimit-Limit') // this shouldn't ever change
        )
      }

      if (res.headers.has('X-RateLimit-Remaining')) {
        rateLimit['X-RateLimit-Remaining'] = Number(
          res.headers.get('X-RateLimit-Remaining')
        )
      }

      if (res.headers.has('X-RateLimit-Reset')) {
        rateLimit['X-RateLimit-Reset'] = Number(
          res.headers.get('X-RateLimit-Reset')
        )
      }

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`)
      }

      --running
      return res.json()
    })
    .catch((err) => {
      --running
      throw new Error(err)
    })
}

export default fetcher
