import { Client, Guild, GuildMember, PartialGuildMember } from 'discord.js'

import {
  DatabaseConnector,
  ServerModel,
  UserModel,
} from '@portaler/data-models'

import roleHandler, { removeUser } from './handlers/roleHandler'
import setupServer from './handlers/setupServer'

interface EventContext {
  client: Client
  db: DatabaseConnector
}

const initEvents = (ctx: EventContext) => {
  const { client, db } = ctx

  const serverModel = new ServerModel(db.dbQuery)
  const userModel = new UserModel(db.dbQuery)

  // bot joins a server
  client.on('guildCreate', (server: Guild) => setupServer(server, serverModel))

  // when a guild is updated
  // client.on('guildUpdate', (_, server: Guild) =>
  //   updateServer(server, serverModel)
  // )

  // when members get updated
  client.on('guildMemberUpdate', (_, member: GuildMember) =>
    roleHandler(member, userModel, serverModel)
  )

  // when a member leaves a server
  client.on('guildMemberRemove', (member: GuildMember | PartialGuildMember) =>
    removeUser(member, userModel, serverModel)
  )
}

export default initEvents
