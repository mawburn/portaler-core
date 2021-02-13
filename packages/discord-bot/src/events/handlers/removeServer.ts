import { Guild } from 'discord.js'

import { db, redis } from '../../db'
import logger from '../../logger'

const removeServer = async (server: Guild) => {
  try {
    const dbRes = await db.dbQuery(
      'DELETE FROM servers WHERE discord_id = $1 RETURNING id',
      [server.id]
    )

    const serverId = dbRes.rows[0].id

    const dbUserIds = await db.dbQuery(
      'DELETE FROM user_servers WHERE server_id = $1 RETURNING user_id',
      [serverId]
    )

    const dbRolesRes = await db.dbQuery(
      'DELETE FROM server_roles WHERE server_id = $1 RETURNING user_id',
      [serverId]
    )

    const userRolesDel = dbRolesRes.rows.map((r) =>
      db.dbQuery('DELETE FROM user_roles WHERE role_id = $1', [r.id])
    )

    logger.info('Users deleted', {
      users: dbUserIds.rows.map((u) => u.user_id),
    })

    await redis.delServer(
      serverId,
      dbUserIds.rows.map((u) => u.user_id)
    )

    await Promise.all(userRolesDel)
    logger.info('ServerDeleted', { server: server.name })
  } catch (err) {
    logger.error('Error deleting server', {
      id: server.id,
      name: server.name,
      error: err,
    })
  }
}

export default removeServer
