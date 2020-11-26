import btoa from 'btoa'
import fetch from 'node-fetch'

import config from '../config'

const creds = btoa(`${config.discord.client}:${config.discord.secret}`)

interface DiscordAccessTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token: string
  scope: string
}

const fetchToken = async (code: string) => {
  const data: any = {
    client_id: config.discord.client,
    client_secret: config.discord.secret,
    grant_type: 'authorization_code',
    code,
    redirect_uri: `${config.discord.redirectUri}`,
    scope: 'identify guilds',
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

  return discordJson
}

export default fetchToken
