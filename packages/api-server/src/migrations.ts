import path from 'path'
import { migrate } from 'postgres-migrations'

import config from './config'
import logger from './utils/logger'

export const migrations = async (): Promise<any> => {
  try {
    await migrate(config.db, path.resolve('./db_migrations'))
  } catch (err) {
    logger.error('Error migrating data', err)
  }
}
