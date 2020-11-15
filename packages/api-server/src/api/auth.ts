import btoa from 'btoa'
import { Request, Response, Router } from 'express'
import { v4 as uuid } from 'uuid'

import {
  DatabaseConnector,
  RedisConnector,
  UserModel,
} from '@portaler/data-models'

import config from '../config'
import wrapAsync from '../middleware/wrapAsync'
import fetchToken from '../utils/discord/fetchToken'
import fetchUser from '../utils/discord/fetchUser'
import fetchUserGuilds from '../utils/discord/fetchUserGuilds'
import logger from '../utils/logger'
import { resolveTypeReferenceDirective } from 'typescript'

const db = new DatabaseConnector(config.db)
const redis = new RedisConnector(config.redis)

const userModel = new UserModel(db.dbQuery)

const router = Router()

router.get('/login', (req: Request, res: Response) =>
  res.redirect(config.discord.authUrl)
)

router.get(
  '/callback',
  wrapAsync(async (req: Request, res: Response) => {
    try {
      if (!req.query.code) {
        throw new Error('No Code Provided')
      }

      const code = req.query.code as string

      const discordJson = await fetchToken(code)
      const token = discordJson.access_token

      const [me, server] = await Promise.all([
        fetchUser(token),
        fetchUserGuilds(token),
      ])

      await userModel.createLogin(me, server, discordJson.refresh_token)

      res.redirect(`${config.discord.authUrl}/?user=${me.id}`)
    } catch (err: Error | any) {
      logger.error('Error logging in user', err)
      res.status(500).json({ error: err.message })
    }
  })
)

// Should come from correct subdomain
router.post(
  '/login',
  wrapAsync(async (req: Request, res: Response) => {
    try {
      if (!req.query.user || !req.subdomains[0]) {
        throw new Error('401')
      }

      const serverId = await db.Server.getServerIdBySubdomain(req.subdomains[0])
      const user = await db.User.getFullUser(req.query.user as string, serverId)

      if (user) {
        const token = btoa(uuid().replaceAll(/-/gi, ''))
        await redis.setUser(token, user.id, serverId)
      }
    } catch (err: Error | any) {
      res.status(401)
    }
  })
)

export default router
