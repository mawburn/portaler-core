import { Router } from 'express'
import { DateTime, ISOTimeOptions } from 'luxon'

import { Portal, PortalPayload } from '@portaler/types'

import {
  addServerPortal,
  deleteServerPortal,
  getServerPortals,
  IPortalModel,
  updateServerPortal,
} from '../database/portals'
import logger from '../utils/logger'

const router = Router()

const ISO_OPTS: ISOTimeOptions = {
  suppressMilliseconds: true,
  includeOffset: false,
}

const getExpireTime = (size: number, hours: number, minutes: number) => {
  const _hours = size === 0 ? 999 : Number(hours)
  const _minutes = size === 0 ? 999 : Number(minutes)

  return DateTime.utc()
    .plus({
      hours: _hours,
      minutes: _minutes,
    })
    .toJSDate()
}

router.get('/', async (req, res) => {
  try {
    const dbPortals: IPortalModel[] = await getServerPortals(req.serverId)
    const now = DateTime.utc()

    const portals: Portal[] = dbPortals.map((p) => {
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

    const expires = getExpireTime(body.size, body.hours, body.minutes)

    const conns = body.connection.sort()

    await addServerPortal(req.serverId, conns, body.size, expires, req.userId)

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

router.put('/:id(\\d+)', async (req, res) => {
  try {
    const body = req.body
    const expireTime = getExpireTime(body.size, body.hours, body.minutes)
    const conns = body.connection.sort()

    await updateServerPortal(
      Number(req.params.id),
      conns,
      body.size,
      expireTime,
      req.userId,
      req.serverId
    )
    res.send(204)
  } catch (err) {
    logger.log.error('Unable to delete', err)
    res.status(500).send({ error: 'Error updating portals' })
  }
})

router.delete('/:id(\\d+)', async (req, res) => {
  try {
    await deleteServerPortal(Number(req.params.id), req.userId, req.serverId)
    res.send(204)
  } catch (err) {
    logger.log.error('Unable to delete', err)
    res.status(500).send({ error: 'Error deleting portal' })
  }
})

export default router
