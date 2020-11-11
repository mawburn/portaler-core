import fetch from 'node-fetch'

import config from '../../config'

export interface DiscordMe {
  id: string
  username: string
  discriminator: string
}

const fetchUser = async (token: string): Promise<DiscordMe> => {
  const res = await fetch(`${config.discord.apiUrl}/users/@me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error('Bad Response from Discord @me')
  }

  return await res.json()
}

export default fetchUser
