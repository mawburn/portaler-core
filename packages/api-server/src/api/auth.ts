import btoa from 'btoa'
import { Request, Response, Router } from 'express'
import { v4 as uuid } from 'uuid'

import { DatabaseConnector, RedisConnector } from '@portaler/data-models'

import config from '../config'
import wrapAsync from '../middleware/wrapAsync'
import fetchToken from '../utils/discord/fetchToken'
import fetchUser from '../utils/discord/fetchUser'
import fetchUserGuilds from '../utils/discord/fetchUserGuilds'
import logger from '../utils/logger'

const isProd = process.env.NODE_ENV === 'production'

const db = new DatabaseConnector(config.db)
const redis = new RedisConnector(config.redis)

const router = Router()

router.get('/login', (req: Request, res: Response) => {
  if (!req.subdomains[0] && isProd) {
    res.send(500)
  }

  const subDomain = !isProd ? 'local' : req.subdomains[0]

  res.cookie('subdomain', `${subDomain}.`, { maxAge: 300, httpOnly: false })
  res.redirect(config.discord.authUrl)
})

// should come from auth.portaler
router.get(
  '/callback',
  wrapAsync(async (req: Request, res: Response) => {
    try {
      if (!req.query.code) {
        throw new Error('No Code Provided')
      }

      if (!req.cookies.subdomain && isProd) {
        throw new Error('NoRedirect')
      }

      const subdomain = isProd ? req.cookies.subdomain : ''

      const code = req.query.code as string

      const discordJson = await fetchToken(code)
      const token = discordJson.access_token

      const [me, server] = await Promise.all([
        fetchUser(token),
        fetchUserGuilds(token),
      ])

      const userId = await db.User.createLogin(
        me,
        server,
        discordJson.refresh_token
      )

      const serverId = await db.Server.getServerIdBySubdomain(
        isProd ? subdomain.slice(0, -1) : 'localhost'
      )

      const user = await db.User.getFullUser(userId, serverId)

      if (!user) {
        return res.sendStatus(401)
      }

      const uid: string = uuid()

      const ourToken = btoa(uid.replace(/-/gi, '')).replace(/=/gi, '')
      await redis.setUser(ourToken, user.id, serverId)

      const protocol = req.secure ? 'https://' : 'http://'

      res.redirect(
        `${protocol}${subdomain}${config.localUrl}/?token=${ourToken}`
      )
    } catch (err: Error | any) {
      logger.error('Error logging in user', err)
      res.status(500).json({ error: 'Error Logging in User' })
    }
  })
)

export default router
