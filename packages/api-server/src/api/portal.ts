import { Router } from 'express'
import { DateTime, ISOTimeOptions } from 'luxon'

import { db } from '../utils/db'
import logger from '../utils/logger'
import { getServerPortals, IPortalModel } from '../database/portals'
import { Portal, PortalPayload } from '@portaler/types'

const router = Router()

const ISO_OPTS: ISOTimeOptions = {
  suppressMilliseconds: true,
  includeOffset: false,
}

router.get('/', async (req, res) => {
  try {
    const dbPortals = await getServerPortals(req.serverId)
    const now = DateTime.utc()

    const portals: Portal[] = dbPortals.map((p: IPortalModel) => {
      const expires = DateTime.fromJSDate(p.expires).toUTC()

      const connection: [string, string] = [p.conn1, p.conn2].sort() as [
        string,
        string
      ]

      return {
        id: p.id,
        connection,
        size: p.size,
        expiresUtc: expires.toISO(ISO_OPTS),
        timeLeft: expires.diff(now).as('seconds'),
      }
    })

    res.status(200).send(portals)
  } catch (err) {
    logger.log.error(
      'Error fetching portals',
      { user: req.userId, server: req.serverId },
      err
    )
    res.status(500).send({ error: 'Error fetching portals' })
  }
})

router.post('/', async (req, res) => {
  try {
    const body: PortalPayload = req.body

    const hours = body.size === 0 ? 999 : Number(body.hours)
    const minutes = body.size === 0 ? 999 : Number(body.minutes)

    const expires = DateTime.utc()
      .plus({
        hours,
        minutes,
      })
      .toJSDate()

    const conns = body.connection.sort()

    // TODO move the queries in this function to the new package
    // retain backwards compatibility until we can edit connections
    const dbRes = await db.dbQuery(
      `
      SELECT id FROM portals
      WHERE server_id = $1 AND conn1 = $2 AND conn2 = $3;
    `,
      [req.serverId, conns[0], conns[1]]
    )

    if (dbRes.rowCount === 0) {
      await db.dbQuery(
        `
      INSERT INTO portals (server_id, conn1, conn2, size, expires, created_by)
      VALUES ($1, $2, $3, $4, $5, $6);
    `,
        [req.serverId, conns[0], conns[1], body.size, expires, req.userId]
      )
    } else {
      await db.dbQuery(
        `
        UPDATE portals
        SET size = $1, expires = $2
        WHERE id = $3;
      `,
        [body.size, expires, dbRes.rows[0].id]
      )
    }

    res.sendStatus(204)
  } catch (err) {
    logger.log.error(
      'Error setting portals',
      { user: req.userId, server: req.serverId },
      err
    )
    res.status(500).send({ error: 'Error setting portals' })
  }
})

export default router
