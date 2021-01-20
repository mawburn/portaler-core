import { Router } from 'express'

import { redis } from '../utils/db'

const router = Router()

router.get('/list', async (_, res) => {
  try {
    const zones = await redis.getZones()
    res.contentType('application/json').status(200).send(zones)
  } catch (err) {
    res.sendStatus(500)
  }
})

export default router
