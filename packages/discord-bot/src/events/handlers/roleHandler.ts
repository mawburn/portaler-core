import { GuildMember, PartialGuildMember } from 'discord.js'

import { db, redis } from '../../db'
import logger from '../../logger'

/**
 * Remove a user's roles and log them out
 * @param  userId
 * @param  serverId
 * @param  roleIds
 * @param  db
 * @param  redis
 */
const removeUserRoles = async (
  userId: number,
  serverId: number,
  roleIds: number[]
) => {
  try {
    await db.User.removeUserRoles(userId, roleIds)

    const token = await redis.getToken(userId, serverId)

    if (token) {
      await redis.delUser(token, userId, serverId)
    }
  } catch (err) {
    logger.error('Remove role', {
      userId,
      serverId,
      roleIds,
      error: err,
    })
  }
}

/**
 * Remove a user from a
 * @param  member
 * @param  db
 * @param  redis
 */
export const removeUser = async (member: GuildMember | PartialGuildMember) => {
  const [server, user] = await Promise.all([
    db.Server.getServer(member.guild.id),
    db.User.getUserByDiscord(member.id),
  ])

  if (user && server) {
    await db.User.removeUserServer(user.id, server.id)

    removeUserRoles(
      user.id,
      server.id,
      server.roles.map((r) => r.id)
    )
  }
}

/**
 * Handles role updates
 * Checking against oldMember vs newMember from Discord.js is highly unreliable,
 * so we need to check against our own data sources
 * @param  member
 * @param  db
 * @param  redis
 */
const roleHandler = async (member: GuildMember) => {
  try {
    const server = await db.Server.getServer(member.guild.id)

    if (server) {
      const user = await db.User.getFullUser(member.id, server.id)
      const roleIds = server.roles.map((r) => r.discordRoleId)

      const newRoles = member.roles.cache.map((r) => r.id)
      const hasRole = newRoles.some((r) => roleIds.includes(r))

      if (user && !hasRole) {
        // role was removed from user
        removeUserRoles(
          user.id,
          server.id,
          server.roles.map((r) => r.id)
        )
      } else if (!user && hasRole) {
        const dbUser = await db.User.getUserByDiscord(member.id)
        const serverRoleIds = server.roles.map((r) => r.id)

        if (dbUser) {
          await db.User.addRoles(dbUser.id, serverRoleIds, server.id)
        } else {
          await db.User.createUser(member, server.id, serverRoleIds)
        }
      }
    }
  } catch (err) {
    logger.error(err)
  }
}

export default roleHandler
