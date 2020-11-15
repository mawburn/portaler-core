import { GuildMember, PartialGuildMember } from 'discord.js'

import { ServerModel, UserModel } from '@portaler/data-models'

export const removeUser = async (
  member: GuildMember | PartialGuildMember,
  userModel: UserModel,
  serverModel: ServerModel
) => {
  const [server, user] = await Promise.all([
    serverModel.getServer(member.guild.id),
    userModel.getUserByDiscord(member.id),
  ])

  if (user) {
    await Promise.all([
      userModel.removeUserRoles(
        user.id,
        server.roles.map((r) => r.id)
      ),
      userModel.removeUserServer(user.id, server.id),
    ])
  }
}

const roleHandler = async (
  member: GuildMember,
  userModel: UserModel,
  serverModel: ServerModel
) => {
  const server = await serverModel.getServer(member.guild.id)
  const user = await userModel.getFullUser(member.id, server.id)

  if (server.roles.some((r) => member.roles.cache.has(r.discordRoleId))) {
    if (!user) {
      const discordUser = await userModel.getUserByDiscord(member.id)

      const roleIds = server.roles.map((r) => r.id)

      if (discordUser) {
        await userModel.addRoles(discordUser.id, roleIds)
      } else {
        await userModel.createUser(member, server.id, roleIds)
      }
    }
  } else if (user) {
    await userModel.removeUserRoles(
      user.id,
      server.roles.map((r) => r.id)
    )
  }
}

export default roleHandler
