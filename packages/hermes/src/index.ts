import 'dotenv/config'

import clearPortals from './databaseActions/clearPortals'

import logger from './logger'
import getDatabases from '@portaler/data-models'
import config from './config'

logger.startUploader()

//-- Start Hermes
;(async () => {
  try {
    const { db } = await getDatabases(config.db, config.redis, logger.log.info)

    clearPortals(db)
  } catch (err) {
    logger.log.error('Hermes stopped!', err)
  }
})()
