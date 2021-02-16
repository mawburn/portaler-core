import { MemberBody } from '.'
import { db, redis } from '../../utils/db'

const removeUserRoles = async (body: MemberBody) =>
  new Promise<void>(async (res, rej) => {
    try {
      const [server, user] = await Promise.all([
        db.Server.getServer(body.serverId),
        db.User.getUserByDiscord(body.user.id),
      ])

      if (user && server) {
        // await db.User.removeUserServer(user.id, server.id)

        await db.User.removeUserRoles(
          user.id,
          server.roles.map((r) => r.id)
        )

        const token = await redis.getToken(user.id, server.id)

        if (token) {
          await redis.delUser(token, user.id, server.id)
        }
      }

      res()
    } catch (err) {
      rej(err)
    }
  })

export default removeUserRoles
