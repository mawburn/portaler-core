import { DatabaseConnector, RedisConnector } from '@portaler/data-models'

import logger from './logger'
import migrations from './migrations'

const populateServers = async (
  db: DatabaseConnector,
  redis: RedisConnector
) => {
  try {
    await migrations()

    const dbServerRes = await db.dbQuery(
      `SELECT id, subdomain FROM servers ORDER BY id`,
      []
    )

    return await Promise.all(
      dbServerRes.rows.map((s) => redis.setAsync(`server:${s.id}`, s.subdomain))
    )
  } catch (err) {
    logger.log.error('Error populating servers', err)
  }
}

export default populateServers
