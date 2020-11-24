import 'dotenv/config'

import cors from 'cors'
import express from 'express'

import clearPortals from './databaseActions/clearPortals'
import initRedis from './databaseActions/initRedis'
import migrations from './databaseActions/migrations'
import logger from './logger'

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

app.listen(3434, () => logger.log.info(`Server started on port: 3434`))

//-- Start Hermes
;(async () => {
  try {
    const { db, redis } = await waitForDatabase()
    await migrations()
    await initRedis(db, redis)

    clearPortals(db)

    serverReady = true
  } catch (err) {
    serverReady = false
    logger.log.error('Hermes stopped!', err)
  }
})()
