import { Guild } from 'discord.js'

import { DatabaseConnector, RedisConnector } from '@portaler/data-models'
import logger from '../../logger'

const removeServer = async (
  server: Guild,
  db: DatabaseConnector,
  redis: RedisConnector
) => {
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

    logger.log.info(
      'Users deleted',
      dbUserIds.rows.map((u) => u.user_id)
    )

    await redis.delServer(
      serverId,
      dbUserIds.rows.map((u) => u.user_id)
    )

    await Promise.allSettled(userRolesDel)
    logger.log.info('ServerDeleted', server.name)
  } catch (err) {
    logger.log.error(
      'Error deleting server',
      { id: server.id, name: server.name },
      err
    )
  }
}

export default removeServer
