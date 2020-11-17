import { Response, Router } from 'express'
import { DateTime, ISOTimeOptions } from 'luxon'

import { db } from '../db'
import { AuthRequest } from '../middleware/verifyUser'
import wrapAsync from '../middleware/wrapAsync'
import logger from '../utils/logger'

const router = Router()
// TODO move most of this to redis, just recreate current API for now
type PortalSize = 2 | 7 | 20

interface Portal {
  source: string
  target: string
  size: PortalSize
  expires: string
  timeLeft: number
}

const ISO_OPTS: ISOTimeOptions = {
  suppressMilliseconds: true,
  includeOffset: false,
}

router.get(
  '/',
  wrapAsync(async (req: AuthRequest, res: Response) => {
    try {
      const dbPortalRes = await db.dbQuery(
        'SELECT * FROM portals WHERE server_id = $1;',
        [req.serverId]
      )

      const now = DateTime.utc()

      const portals: Portal[] = dbPortalRes.rows.map((p) => {
        const expires = DateTime.fromJSDate(p.expires).toUTC()

        return {
          source: p.conn1,
          target: p.conn2,
          size: p.size,
          expires: expires.toISO(ISO_OPTS),
          timeLeft: expires.diff(now).as('minutes'),
        }
      })

      res.status(200).send(portals)
    } catch (err) {
      logger.error(err)
      res.status(500).send({ error: 'Error fetching portals' })
    }
  })
)

router.post(
  '/',
  wrapAsync(async (req: AuthRequest, res: Response) => {
    try {
      const body = req.body

      const expires = DateTime.utc().plus({
        hours: Number(body.hours),
        minutes: Number(body.minutes),
      })

      const conns = [body.source, body.target].sort()

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

      res.sendStatus(200)
    } catch (err) {
      logger.error(err)
      res.status(500).send({ error: 'Error setting portals' })
    }
  })
)

export default router
