import { db } from '../../utils/db'
import { MemberBody } from './'
import removeUserRoles from './removeUserRoles'

const updateUser = async (body: MemberBody) =>
  new Promise<void>(async (res, rej) => {
    try {
      const server = await db.Server.getServer(body.serverId)

      if (server) {
        const user = await db.User.getFullUser(body.user.id, server.id)
        const roleIds = server.roles.map((r) => r.discordRoleId)

        const hasRoles = body.roles.every((r) => roleIds.includes(r))

        if (user && !hasRoles) {
          // role was removed from user
          removeUserRoles(body)
        } else if (!user && hasRoles) {
          const dbUser = await db.User.getUserByDiscord(body.user.id)
          const serverRoleIds = server.roles.map((r) => r.id)

          if (dbUser) {
            await db.User.addRoles(dbUser.id, serverRoleIds, server.id)
          } else {
            await db.User.createUser(body.user, server.id, serverRoleIds)
          }
        }

        res()
      }

      rej('No server found')
    } catch (err) {
      rej(err)
    }
  })

export default updateUser
