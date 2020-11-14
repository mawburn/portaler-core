import { DatabaseConnector } from '@portaler/data-models'
import { Client, Guild } from 'discord.js'
import setupServer from './handlers/setupServer'
import updateServer from './handlers/updateServer'

interface EventContext {
  client: Client
  db: DatabaseConnector
}

const initEvents = (ctx: EventContext) => {
  const { client, db } = ctx

  // bot joins a server
  client.on('guildCreate', (s: Guild) => setupServer(s.id, db))

  // when a guild is updated
  client.on('guildUpdate', (s: Guild) => updateServer(s.id, db))

  // when members get updated
  client.on('guildMemberUpdate', () => null)
  client.on('guildMemberAdd', () => null)
  client.on('guildMemberRemove', () => null)
  client.on('guildBanAdd', () => null)

  // when roles get updated
  client.on('roleUpdate', () => null)
  client.on('roleCreate', () => null)
  client.on('roleDelete', () => null)
}

export default initEvents
