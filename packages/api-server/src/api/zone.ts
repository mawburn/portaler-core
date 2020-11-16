import { Router, Response } from 'express'
import zoneData from '../data/zones.json'

const router = Router()

router.get('/', (_, res: Response) => res.status(200).send(zoneData))

export default router
