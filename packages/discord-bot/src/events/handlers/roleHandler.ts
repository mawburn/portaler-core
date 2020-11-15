import { GuildMember, PartialGuildMember } from 'discord.js'

import { DatabaseConnector, RedisConnector } from '@portaler/data-models'

export const removeUser = async (
  member: GuildMember | PartialGuildMember,
  db: DatabaseConnector,
  redis: RedisConnector
) => {
  const [server, user] = await Promise.all([
    db.Server.getServer(member.guild.id),
    db.User.getUserByDiscord(member.id),
  ])

  if (user) {
    const token = await redis.getToken(user.id, server.id)

    await Promise.allSettled([
      db.User.removeUserRoles(
        user.id,
        server.roles.map((r) => r.id)
      ),
      db.User.removeUserServer(user.id, server.id),
      redis.delUser(token, user.id, server.id),
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

    const token = await redis.getToken(user.id, server.id)
    await redis.delUser(token, user.id, server.id)
  }
}

export default roleHandler
