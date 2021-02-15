import { Guild } from 'discord.js'

import { db, redis } from '../../utils/db'
import logger from '../../utils/logger'
import client, { readOnlyPayload, rolePayload } from './client'

interface RoleInfo {
  dbId: number
  discId: string
}

const setupServer = (body: { id: string; name: string }) =>
  new Promise<void>(async (res, rej) => {
    try {
      const dbServer = await db.Server.getServer(body.id)

      const serverId = dbServer
        ? dbServer.id
        : await db.Server.create(body.id, body.name)

      const discordServer: Guild = await client.guilds.fetch(body.id)

      const discordServerRoles: string[] = (
        await discordServer.roles.cache
      ).map((r) => r.id)

      const roleTuple: [RoleInfo, RoleInfo] = [
        { dbId: 0, discId: '' },
        { dbId: 0, discId: '' },
      ]

      dbServer?.roles.forEach(async (r) => {
        if (!discordServerRoles.includes(r.discordRoleId)) {
          const role = await discordServer.roles.create({
            data: r.isReadOnly ? readOnlyPayload : rolePayload,
            reason: 'Add authentication for Portaler',
          })

          const roleServerId = await db.Server.createRole(serverId!, role.id)

          const pos = r.isReadOnly ? 1 : 0

          roleTuple[pos] = {
            dbId: roleServerId,
            discId: role.id,
          }
        }
      })

      const discordMembers = (await discordServer.members.cache).filter((m) =>
        m.roles.cache.some(
          (r) => r.id === roleTuple[0].discId || r.id === roleTuple[1].discId
        )
      )

      const discordMemberIds = discordMembers.map((m) => m.id)

      const membersInDb = await Promise.all(
        discordMemberIds.map((dId) => db.User.getUserByDiscord(dId))
      )

      await Promise.all(
        discordMembers.map(async (m) => {
          const user = membersInDb.find((mDb) => mDb?.discordId === m.id)
          const memberRoleIds = m.roles.cache.map((r) => r.id)

          const rolesToAdd = roleTuple
            .filter((rt) => memberRoleIds.includes(rt.discId))
            .map((r) => r.dbId)

          if (!user) {
            return db.User.createUser(m, serverId!, rolesToAdd)
          } else {
            return db.User.addRoles(user.id, rolesToAdd, serverId!)
          }
        })
      )

      const subdomain = dbServer?.subdomain ?? null

      if (subdomain) {
        await redis.setAsync(`server:${serverId!}`, subdomain)

        await redis.setAsync(
          `server:${subdomain}`,
          JSON.stringify({
            isPublic: dbServer?.isPublic,
            serverId: dbServer?.id,
            discordUrl: dbServer?.discordUrl,
          })
        )
      }

      logger.info('Added server', {
        id: serverId,
        name: body.name,
        discordId: body.id,
        memberCount: discordMemberIds.length,
      })

      res()
    } catch (err) {
      rej(err)
    }
  })

export default setupServer
