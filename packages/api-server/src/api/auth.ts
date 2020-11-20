import btoa from 'btoa'
import { Request, Response, Router } from 'express'
import { v4 as uuid } from 'uuid'

import config from '../config'
import { db, redis } from '../db'
import wrapAsync from '../middleware/wrapAsync'
import fetchToken from '../utils/discord/fetchToken'
import fetchUser from '../utils/discord/fetchUser'
import fetchUserGuilds from '../utils/discord/fetchUserGuilds'
import logger from '../utils/logger'

const isProd = process.env.NODE_ENV === 'production'

const router = Router()

router.get('/login', (req: Request, res: Response) => {
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

      const protocol = req.secure ? 'https://' : 'http://'
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
        isProd ? subdomain : 'localhost'
      )

      const user = await db.User.getFullUser(userId, serverId)

      const redirectUrl = `${protocol}${subdomain}.${config.localUrl}`

      if (!user) {
        res.status(401)
        return res.status(401).redirect(`${redirectUrl}/?token=invalid`)
      }

      const uid: string = uuid()

      const ourToken = btoa(uid.replace(/-/gi, '')).replace(/=/gi, '')
      await redis.setUser(ourToken, user.id, serverId)

      res.redirect(`${redirectUrl}/?token=${ourToken}`)
    } catch (err: Error | any) {
      logger.error('Error logging in user', err)
      res.status(500).json({ error: 'Error Logging in User' })
    }
  })
)

export default router
