import btoa from 'btoa'
import { Request, Response, Router } from 'express'
import fetch from 'node-fetch'

import config from '../config'
import wrapAsync from '../middleware/wrapAsync'

const router = Router()

interface DiscordAccessTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token: string
  scope: string
}

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

      const code = req.query.code

      const creds = btoa(`${config.discord.client}:${config.discord.secret}`)

      const data: any = {
        client_id: config.discord.client,
        client_secret: config.discord.secret,
        grant_type: 'authorization_code',
        code,
        redirect_uri: `${config.discord.redirectUri}`,
        scope: 'identify email guilds',
      }

      const discordRes = await fetch(`${config.discord.apiUrl}/oauth2/token`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${creds}`,
          ContentType: 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(data),
      })

      if (!discordRes.ok) {
        throw new Error('Bad Response from Discord Auth')
      }

      const discordJson: DiscordAccessTokenResponse = await discordRes.json()

      res.redirect(`${config.authUrl}/?token=${discordJson.access_token}`)
    } catch (err: Error | any) {
      // TODO add logging here
      res.status(500).json({ error: err.message })
    }
  })
)
export default router
