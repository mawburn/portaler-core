import { Client, Guild, GuildMember, PartialGuildMember } from 'discord.js'

import { DatabaseConnector, RedisConnector } from '@portaler/data-models'

import messageHandler from './handlers/messageHandler'
import removeServer from './handlers/removeServer'
import roleHandler, { removeUser } from './handlers/roleHandler'
import setupServer from './handlers/setupServer'

interface EventContext {
  client: Client
  db: DatabaseConnector
  redis: RedisConnector
}

const initEvents = (ctx: EventContext) => {
  const { client, db, redis } = ctx

  // bot joins a server
  client.on('guildCreate', (server: Guild) => setupServer(server, db, redis))

  client.on('guildDelete', (server: Guild) => removeServer(server, db, redis))

  // when a guild is updated
  // client.on('guildUpdate', (_, server: Guild) =>
  //   updateServer(server, db)
  // )

  // when members get updated
  client.on('guildMemberUpdate', (_, member: GuildMember) =>
    roleHandler(member, db, redis)
  )

  // when a member leaves a server
  client.on('guildMemberRemove', (member: GuildMember | PartialGuildMember) =>
    removeUser(member, db, redis)
  )

  // client.on('message', messageHandler)
}

export default initEvents
