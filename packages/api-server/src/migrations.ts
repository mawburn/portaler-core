import path from 'path'
import { createDb, migrate } from 'postgres-migrations'

import config from './config'
import logger from './utils/logger'

export const migrations = async (): Promise<any> => {
  try {
    await createDb(config.db.database, {
      ...config.db,
      defaultDatabase: 'postgres', // defaults to "postgres"
    })
    await migrate(config.db, path.resolve('./db_migrations'))

    return Promise.resolve()
  } catch (err) {
    logger.error('Error migrating data', err)
  }
}
