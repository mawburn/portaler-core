import { Router } from 'express'

import { zoneList } from '../database/zones'

const router = Router()

router.get('/list', async (_, res) => res.status(200).send(zoneList))

export default router
