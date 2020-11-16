import { Guild } from 'discord.js'

import { DatabaseConnector } from '@portaler/data-models'

const removeServer = async (server: Guild, db: DatabaseConnector) => {
  const dbRes = await db.dbQuery(
    'DELETE FROM servers WHERE discord_id = $1 RETURNING id',
    [server.id]
  )

  const serverId = dbRes.rows[0].id

  await db.dbQuery('DELETE FROM user_servers WHERE server_id = $1', [serverId])

  const dbRolesRes = await db.dbQuery(
    'DELETE FROM server_roles WHERE server_id = $1 RETURNING id',
    [serverId]
  )

  const rolesDel = db.dbQuery('DELETE FROM user_roles WHERE server_id = $1', [
    serverId,
  ])

  const userServerDel = db.dbQuery(
    'DELETE FROM user_servers WHERE server_id = $1',
    [serverId]
  )

  const userRolesDel = dbRolesRes.rows.map((r) =>
    db.dbQuery('DELETE FROM user_roles WHERE role_id = $1', [r.id])
  )

  // TODO cleanup redis

  await Promise.allSettled([userServerDel, rolesDel, ...userRolesDel])
  console.log('ServerDeleted') // TODO log this for real somewhere
}

export default removeServer
