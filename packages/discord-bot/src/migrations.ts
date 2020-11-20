import path from 'path'
import { migrate, createDb } from 'postgres-migrations'

import config from './config'

const migrations = async (): Promise<any> => {
  try {
    await createDb(config.db.database, {
      ...config.db,
      defaultDatabase: 'postgres', // defaults to "postgres"
    })

    await migrate(config.db, path.resolve('./db_migrations'))
  } catch (err) {
    console.error('Error migrating data', err)
  }
}

export default migrations
