import { NextFunction, Request, Response } from 'express'

import { redis } from '../db'
import logger from '../logger'
import wrapAsync from './wrapAsync'

export interface AuthRequest extends Request {
  userId: number
  serverId: number
}

const verifyUser = wrapAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.headers.authorization) {
        return res.sendStatus(401)
      }

      const authHeaders = req.headers.authorization.split(' ')

      if (authHeaders[0] !== 'Bearer') {
        return res.sendStatus(401)
      }

      const token = authHeaders[1]

      const userServer = await redis.getUser(token)

      if (!userServer) {
        return res.sendStatus(403)
      }

      const [userId, serverId] = userServer.split(':')

      const subdomain = await redis.getAsync(`server:${serverId}`)

      if (
        process.env.NODE_ENV === 'production' &&
        subdomain !== req.subdomains[0]
      ) {
        return res.sendStatus(403)
      }

      ;(req as AuthRequest).userId = Number(userId)
      ;(req as AuthRequest).serverId = Number(serverId)

      next()
    } catch (err) {
      logger.log.warn('Error verifying user', err)
      return res.status(500).send({ error: 'Error Verifying User' })
    }
  }
)

export default verifyUser
