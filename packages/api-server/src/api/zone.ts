import { Response, Router } from 'express'

import zoneData from '../data/zones.json'
import zoneTiers from '../data/zoneTiers.json'

const router = Router()

router.get('/', (_, res: Response) => res.status(200).send(zoneData))
router.get('/tiers', (_, res: Response) => res.status(200).send(zoneTiers))

export default router
