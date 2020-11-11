import { Client, GuildMember, PartialGuildMember, Role } from 'discord.js'
import config from '../config'

import { addRole, addServer, getRoleId, updateRole } from '../models/server'
import { addUserRole, getUser, removeUserRole } from '../models/user'
import logger from '../utils/logger'

const client = new Client()
client.login(config.discord.bot)

// When the bot joins a server
client.on('guildCreate', async (server) => {
  logger.info('Joined a new server', server.id, server.name)
  // await addServer(server)
  // add roles
  // add all users
})

// When a member is updated
client.on(
  'guildMemberUpdate',
  async (_: GuildMember | PartialGuildMember, member: GuildMember) => {
    logger.info('Guild Member update', _, member)
    // const serverId = member.guild.id

    // const [roleInfo, user] = await Promise.all([
    //   await getRoleId(serverId),
    //   await getUser(member.id),
    // ])

    // if (!!roleInfo && typeof user !== 'string') {
    //   const hasRole = member.roles.cache.find((r) => r.id === roleInfo.discord)
    //   const userRole = user.serverAccess?.find(
    //     (s) => s.serverId === serverId && s.roleId === roleInfo.discord
    //   )

    //   if (hasRole && userRole) {
    //     // user has role on both ends, do nothing
    //     return null
    //   } else if (hasRole && !userRole) {
    //     await addUserRole(user.id, roleInfo.id)
    //     return null
    //   } else if (!hasRole && userRole) {
    //     await removeUserRole(user.id, roleInfo.id)
    //     return null
    //   }
    // }
  }
)

const handleRoleUpdate = async (old: Role, newRole?: Role) => {
  logger.info('Handle Role Update', old, newRole)
  // if (!newRole && old.name.toLowerCase() !== config.discord.role) {
  //   return null
  // }

  // if (
  //   (!newRole && old.name.toLowerCase() === config.discord.role) ||
  //   newRole?.name.toLowerCase() === config.discord.role
  // ) {
  //   const roleId = await getRoleId(old.guild.id)

  //   if (!roleId) {
  //     await addRole(old.guild.id, !!newRole ? newRole.id : old.id)
  //   } else if (newRole) {
  //     await updateRole(old.guild.id, newRole.id)
  //   }
  // }
}

client.on('roleUpdate', handleRoleUpdate)
client.on('roleCreate', handleRoleUpdate)

// TODO handle guildUpdate for name changes
