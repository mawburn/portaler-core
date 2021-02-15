import { Guild } from 'discord.js'
import { Router } from 'express'

import logger from '../../utils/logger'
import setupServer from './setupServer'

const router = Router()

router.post('/addServer', async (req, res) => {
  const body: { id: string; name: string } = req.body

  try {
    await setupServer(body)
  } catch (err) {
    logger.error('Error setting up server', {
      name: body.name,
      error: {
        error: JSON.stringify(err),
        trace: err.stack && err.stack(),
      },
    })

    res.sendStatus(500)
  }
})

export default router
