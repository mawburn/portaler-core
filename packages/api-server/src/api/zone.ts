import { Response, Router } from 'express'

import { Zone } from '@portaler/types'

import zoneData from '../data/zones.json'
import zoneTiers from '../data/zoneTiers.json'
import { redis } from '../db'
import logger from '../logger'
import { AuthRequest } from '../middleware/verifyUser'
import wrapAsync from '../middleware/wrapAsync'

const router = Router()

router.get('/', (_, res: Response) => res.status(200).send(zoneData))
router.get('/tiers', (_, res: Response) => res.status(200).send(zoneTiers))

router.get(
  '/list',
  wrapAsync(async (req: AuthRequest, res: Response) => {
    try {
      const zones = await redis.getAsync('zones')

      res.setHeader('Content-Type', 'application/json') // this might not be needed
      res.status(200).send(zones)
    } catch (err) {
      logger.log.error(
        'Error fetching zones from redis',
        { userId: req.userId, serverId: req.serverId },
        err
      )
      res.status(500).send({ error: 'Error fetching zones' })
    }
  })
)

export default router
