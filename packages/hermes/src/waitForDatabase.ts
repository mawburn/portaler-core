import retry from 'async-retry'
import { DatabaseConnector, RedisConnector } from '@portaler/data-models'

import config from './config'

import logger from './logger'

// export const db = new DatabaseConnector(config.db)
// export const redis = new RedisConnector(config.redis)

const waitForDatabase = async (): Promise<{
  db: DatabaseConnector
  redis: RedisConnector
}> =>
  await retry(
    async () => {
      const db = new DatabaseConnector(config.db)

      const rows = await db.dbQuery('SELECT NOW();')

      if (rows.rowCount === 0) {
        throw new Error('Error connecting to db')
      }

      const redis = new RedisConnector(config.redis)

      if (redis) {
        logger.log.info('Connected to Db & Redis')
        return { db, redis }
      } else {
        throw new Error('Error connecting to Redis')
      }
    },
    {
      retries: 100,
      minTimeout: 100,
      randomize: false,
      onRetry: (err, count: number) =>
        logger.log.info(`Retrying db connection ${count}`, err),
    }
  )

export default waitForDatabase
