import { Client, Guild, GuildMember, PartialGuildMember } from 'discord.js'
import fetch, { Headers } from 'node-fetch'

import config from '../config'
import logger from '../logger'
import removeServer from './handlers/removeServer'
import roleHandler, { removeUser } from './handlers/roleHandler'

const headers = new Headers()

headers.set('Authorization', `Bearer ${config.portaler.key}`)
headers.set('User-Agent', 'discord-bot')
headers.set('Referrer', 'discord-bot')

const initEvents = (client: Client) => {
  // bot joins a server
  client.on('guildCreate', async (server: Guild) => {
    try {
      await fetch(`${config.portaler.api}/addServer`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ id: server.id, name: server.name }),
      })
    } catch (err) {
      logger.error('Error setting up server', {
        name: server.name,
        id: server.id,
        error: {
          error: JSON.stringify(err),
          trace: err.stack && err.stack(),
        },
      })
    }
  })

  client.on('guildDelete', (server: Guild) => removeServer(server))

  // when a guild is updated
  // client.on('guildUpdate', (_, server: Guild) =>
  //   updateServer(server, db)
  // )

  // when members get updated
  client.on('guildMemberUpdate', (_, member: GuildMember) =>
    roleHandler(member)
  )

  // when a member leaves a server
  client.on('guildMemberRemove', (member: GuildMember | PartialGuildMember) =>
    removeUser(member)
  )
}

export default initEvents
