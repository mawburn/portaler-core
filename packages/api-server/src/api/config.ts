import { Router } from 'express'

import { redis } from '../utils/db'
import logger from '../utils/logger'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const serverConfigRes = await redis.getAsync(`server:${req.subdomains[0]}`)
    const serverConfig = serverConfigRes ? JSON.parse(serverConfigRes) : false

    res.status(200).send({ publicRead: serverConfig.isPublic })
  } catch (err) {
    logger.log.error('Error fetching config', err)

    res.status(200).send({ publicRead: false })
  }
})

export default router
