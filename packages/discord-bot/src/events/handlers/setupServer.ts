import { Guild } from 'discord.js'

import { DatabaseConnector, RedisConnector } from '@portaler/data-models'
import { IUserModel } from '@portaler/data-models/out/models/User'

import config from '../../config'
import logger from '../../logger'

const setupServer = async (
  server: Guild,
  db: DatabaseConnector,
  redis: RedisConnector
) => {
  const rolePayload = {
    name: config.roleName,
    permissions: 0,
    color: '#aa00ff',
    hoist: false,
    mentionableRole: false,
  }

  try {
    let serverId = null

    const dbServer = await db.Server.getServer(server.id)

    if (dbServer) {
      if (dbServer.roles.length > 0) {
        return 'Server Already Exists'
      }

      serverId = dbServer.id
    }

    const discordRoles = await server.roles.cache

    const hasRole = discordRoles.find(
      (r) => r.id === dbServer?.roles[0].discordRoleId
    )

    const role =
      hasRole ||
      (await server.roles.create({
        data: rolePayload,
        reason: 'Add authentication for Portaler.zone',
      }))

    const sid = serverId ?? (await db.Server.create(server.id, server.name))

    const serverRoleId =
      hasRole && dbServer
        ? dbServer.roles[0].id
        : await db.Server.createRole(sid, role.id)

    // if we already had the role, then look for all the users with it
    if (hasRole) {
      const members = await server.members.fetch({ force: true })

      const membersToAdd = members.filter((m) => m.roles.cache.has(role.id))

      const usersInDbRes = await Promise.all(
        membersToAdd.map((m) => db.User.getUserByDiscord(m.id))
      )

      const usersInDb = usersInDbRes.filter(Boolean) as IUserModel[]

      const usersNotInDb = membersToAdd.filter(
        (m) => !usersInDb.find((u) => u?.discordId === m.id)
      )

      const addRolesToUsers = usersInDb.map((u) =>
        db.User.addRoles(u.id, [serverRoleId], sid)
      )

      const addUsersAndRoles = usersNotInDb.map((m) =>
        db.User.createUser(m, sid, [serverRoleId])
      )

      const addToRedis = redis.setAsync(`server:${sid}`, '')

      await Promise.all([addToRedis, ...addRolesToUsers, ...addUsersAndRoles])
    }
  } catch (err) {
    logger.log.error(
      'Error setting up server',
      { name: server.name, id: server.id },
      err
    )
  }
}

export default setupServer
