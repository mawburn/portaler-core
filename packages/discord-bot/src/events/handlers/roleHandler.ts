import { GuildMember, PartialGuildMember } from 'discord.js'

import { DatabaseConnector, RedisConnector } from '@portaler/data-models'

export const removeUser = async (
  member: GuildMember | PartialGuildMember,
  db: DatabaseConnector,
  redis: RedisConnector
) => {
  await redis.delUser(member.id, member.guild.id)

  const [server, user] = await Promise.all([
    db.Server.getServer(member.guild.id),
    db.User.getUserByDiscord(member.id),
  ])

  if (user) {
    await Promise.all([
      db.User.removeUserRoles(
        user.id,
        server.roles.map((r) => r.id)
      ),
      db.User.removeUserServer(user.id, server.id),
    ])
  }
}

const roleHandler = async (
  member: GuildMember,
  db: DatabaseConnector,
  redis: RedisConnector
) => {
  const server = await db.Server.getServer(member.guild.id)
  const user = await db.User.getFullUser(member.id, server.id)

  if (server.roles.some((r) => member.roles.cache.has(r.discordRoleId))) {
    if (!user) {
      const discordUser = await db.User.getUserByDiscord(member.id)

      const roleIds = server.roles.map((r) => r.id)

      if (discordUser) {
        await db.User.addRoles(discordUser.id, roleIds)
      } else {
        await db.User.createUser(member, server.id, roleIds)
      }
    }
  } else if (user) {
    await db.User.removeUserRoles(
      user.id,
      server.roles.map((r) => r.id)
    )

    await redis.delUser(user.discordId, server.discordId)
  }
}

export default roleHandler
