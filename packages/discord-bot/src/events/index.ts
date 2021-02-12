import { Client, Guild, GuildMember, PartialGuildMember } from 'discord.js'

import removeServer from './handlers/removeServer'
import roleHandler, { removeUser } from './handlers/roleHandler'
import setupServer from './handlers/setupServer'

const initEvents = (client: Client) => {
  // bot joins a server
  client.on('guildCreate', (server: Guild) => setupServer(server))

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
