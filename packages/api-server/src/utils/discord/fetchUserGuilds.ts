import fetch from 'node-fetch'

import config from '../config'

export interface DiscordMeGuilds {
  id: string
  name: string
  icon: string
  owner: boolean
  permissions: string
  features: string[]
}

const fetchUserGuilds = async (token: string): Promise<DiscordMeGuilds[]> => {
  const res = await fetch(`${config.discord.apiUrl}/users/@me/guilds`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error('Bad Response from Discord @me/guilds')
  }

  return await res.json()
}

export default fetchUserGuilds
