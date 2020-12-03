import 'dotenv/config'

import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'

import Api from './api'
import Admin from './api/admin'
import Auth from './api/auth'
import ConfigRouter from './api/config'
import initServer from './initServer'
import checkAdmin from './middleware/checkAdmin'
import syntaxError from './middleware/syntaxError'
import verifyUser from './middleware/verifyUser'
import config from './utils/config'
import logger from './utils/logger'

logger.startUploader()

// initialize the server
;(async () => {
  await initServer()

  const app = express()

  app.use(cors(config.cors))

  app.use(bodyParser.json())
  app.use(cookieParser())
  app.use(compression())

  app.use(syntaxError)

  app.use('/api/auth', Auth)

  app.get('/api/health', (_, res) => res.status(200).send({ server: 'ok' }))
  app.get('/api/bot', (_, res) => res.redirect(config.discord.botUrl))
  app.get('/api/config', ConfigRouter)

  app.use('/api/admin', checkAdmin, Admin)
  app.use('/api', verifyUser, Api)

  app.listen(config.port, () =>
    logger.log.info(`Server started on port: ${config.port}`)
  )
})()
