import { NextFunction, Request, Response } from 'express'

import { RedisConnector } from '@portaler/data-models'

import config from '../config'
import wrapAsync from './wrapAsync'

const redis = new RedisConnector(config.redis)

const verifyUser = wrapAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
      return res.status(403)
    }

    const token = req.headers.authorization.split(' ')[1]

    const userServer = await redis.getUser(token)

    const [userId, serverId] = userServer.split(':')

    ;(req as any).userId = userId
    ;(req as any).serverId = serverId

    next()
  }
)

export default verifyUser
