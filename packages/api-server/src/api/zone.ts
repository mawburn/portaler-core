import { Router } from 'express'

import { getZoneMeta } from '../database/zones'
import { redis } from '../utils/db'
import logger from '../utils/logger'

const router = Router()

router.get('/list', async (_, res) => {
  try {
    const zones = await redis.getZones()
    res.contentType('application/json').status(200).send(zones)
  } catch (err) {
    logger.error('Error fetching zones', {
      error: {
        error: JSON.stringify(err),
        trace: err.stack && err.stack(),
      },
    })
    res.sendStatus(500)
  }
})

router.get('/info/:id', async (req, res) => {
  try {
    const zone = await getZoneMeta(Number(req.params.id))
    res.contentType('application/json').status(200).send(zone)
  } catch (err) {
    logger.error('Error fetching zone info', {
      error: {
        error: JSON.stringify(err),
        trace: err.stack && err.stack(),
      },
    })
    res.sendStatus(500)
  }
})

export default router
