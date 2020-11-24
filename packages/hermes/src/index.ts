import 'dotenv/config'

import cors from 'cors'
import express from 'express'

import clearPortals from './databaseActions/clearPortals'
import initRedis from './databaseActions/initRedis'
import migrations from './databaseActions/migrations'
import logger from './logger'
import { createHttpTerminator } from 'http-terminator'

import waitForDatabase from './waitForDatabase'

const app = express()

app.use(
  cors({
    origin: 'localhost',
    methods: 'GET',
  })
)

logger.startUploader()

let serverReady = false

app.get('/health', (_, res) => res.status(200).send({ serverReady }))

const server = app.listen(3434, () =>
  logger.log.info(`Server started on port: 3434`)
)

//-- Start Hermes
;(async () => {
  try {
    const { db, redis } = await waitForDatabase()
    await migrations()
    await initRedis(db, redis)

    clearPortals(db)

    serverReady = true

    // This doesn't need to run forever, so lets shut it down after an hour
    setTimeout(() => {
      const httpTerminator = createHttpTerminator({ server })
      httpTerminator.terminate()
    }, 60 * 60 * 1000)
  } catch (err) {
    serverReady = false
    logger.log.error('Hermes stopped!', err)
  }
})()
