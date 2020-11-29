import { UserAction } from '@portaler/data-models/out/models/User'
import { PortalSize } from '@portaler/types'

import { db } from '../utils/db'

export interface IPortalModel {
  id: number
  serverId: number
  conn1: string
  conn2: string
  size: PortalSize
  expires: Date
  created_by: number
  created_on: Date
}

export const getServerPortals = async (
  serverId: number
): Promise<IPortalModel[]> =>
  (await db.dbQuery('SELECT * FROM portals WHERE server_id = $1;', [serverId]))
    .rows

export const addServerPortal = async (
  serverId: number,
  conns: [string, string],
  size: PortalSize,
  expires: Date,
  userId: number
) => {
  try {
    await db.dbQuery(
      `
    INSERT INTO portals (server_id, conn1, conn2, size, expires, created_by)
    VALUES ($1, $2, $3, $4, $5, $6);
  `,
      [serverId, conns[0], conns[1], size, expires, userId]
    )

    await db.User.logUserAction(
      userId,
      serverId,
      UserAction.add,
      JSON.stringify({
        conns,
        expires,
      })
    )

    return
  } catch (err) {
    throw err
  }
}

export const deleteServerPortal = async (
  portalIds: number[],
  userId: number,
  serverId: number
): Promise<void> => {
  const portalDb = await db.dbQuery(
    `
    SELECT ROW_TO_JSON(portal) as json_field
    FROM (SELECT * FROM portals WHERE id = ANY($1::int[]) AND server_id = $2) portal
    `,
    [portalIds, serverId]
  )

  if (portalDb.rowCount > 0) {
    await db.dbQuery(
      `DELETE FROM portals WHERE id = ANY($1::int[]) AND serverId = $2`,
      [portalIds, serverId]
    )

    await db.User.logUserAction(
      userId,
      serverId,
      UserAction.delete,
      JSON.stringify(portalDb.rows[0])
    )
    return
  }

  throw Error('User does not have permissions')
}

export const updateServerPortal = async (
  portalId: number,
  conns: [string, string],
  size: PortalSize,
  expires: Date,
  userId: number,
  serverId: number
): Promise<void> => {
  const portalDb = await db.dbQuery(
    `
    SELECT ROW_TO_JSON(portal) as json_field, server_id
    FROM (SELECT * FROM portals WHERE id = $1) portal
    `,
    [portalId]
  )

  if (serverId === portalDb.rows[0].server_id) {
    await db.dbQuery(
      `
      UPDATE portals
      SET conn1 = $1,
        conn2 = $2,
        size = $3,
        expires = $4,
        updated_by = $5,
        updated_on = NOW()
      WHERE id = $6 AND serverId = $7 RETURNING `,
      [conns[0], conns[1], size, expires, userId, portalId, serverId]
    )

    const portalUpdateDb = await db.dbQuery(
      `
      SELECT ROW_TO_JSON(portal) as json_field, server_id
      FROM (SELECT * FROM portals WHERE id = $1) portal
      `,
      [portalId]
    )

    await db.User.logUserAction(
      userId,
      serverId,
      UserAction.update,
      JSON.stringify({
        from: portalDb.rows[0].json_field,
        to: portalUpdateDb.rows[0].json_field,
      })
    )
    return
  }

  throw Error('User does not have permissions')
}
