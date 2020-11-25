import retry from 'async-retry'
import { PoolConfig } from 'pg'
import { ClientOpts } from 'redis'

import DatabaseConnector from './DatabaseConnector'
import RedisConnector from './RedisConnector'

const getDatabases = async (
  dbConfig: PoolConfig,
  redisConfig: ClientOpts,
  logInfo: (...x: any) => void
): Promise<{
  db: DatabaseConnector
  redis: RedisConnector
}> =>
  await retry(
    async () => {
      const db = new DatabaseConnector(dbConfig)

      const rows = await db.dbQuery('SELECT NOW();')

      if (rows.rowCount === 0) {
        throw new Error('Error connecting to db')
      }

      const redis = new RedisConnector(redisConfig)

      if (redis) {
        logInfo('Connected to Db & Redis')
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
        logInfo(`Retrying db connection ${count}`, err),
    }
  )

export { DatabaseConnector, RedisConnector }
export { IServerModel } from './models/Server'
export { IUserModel } from './models/User'

export default getDatabases
