import path from 'path'
import { createDb, migrate } from 'postgres-migrations'
import config from './config'
import logger from './logger'

const migrations = async () => {
  try {
    await createDb(config.db.database, {
      ...config.db,
      defaultDatabase: 'postgres', // defaults to "postgres"
    })

    await migrate(config.db, path.resolve('./db_migrations'))
  } catch (err) {
    logger.log.error('Error populating servers', err)
  }
}

export default migrations
