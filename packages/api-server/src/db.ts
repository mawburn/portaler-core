import retry from 'async-retry'
import fetch from 'node-fetch'

import { DatabaseConnector, RedisConnector } from '@portaler/data-models'

import config from './config'
import logger from './logger'

let db: DatabaseConnector
let redis: RedisConnector

const waitOnHermes = async () =>
  await retry(
    async () => {
      const hermes = await fetch('http://localhost:3434/health').then((res) =>
        res.json()
      )

      if (!hermes.serverReady) {
        throw new Error('Database not ready')
      } else {
        db = new DatabaseConnector(config.db)
        redis = new RedisConnector(config.redis)
        return true
      }
    },
    {
      retries: 100,
      randomize: false,
      onRetry: (_, count) => {
        logger.log.info('Database not ready.', count)
      },
    }
  )

export default waitOnHermes
export { db, redis }
