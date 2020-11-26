import { db, redis } from './db'
import logger from './logger'

const populateServers = async () => {
  try {
    const dbServerRes = await db.dbQuery(
      `SELECT id, subdomain FROM servers ORDER BY id;`,
      []
    )

    await Promise.all(
      dbServerRes.rows
        .map(
          (s: any) =>
            s.subdomain && redis.setAsync(`server:${s.id}`, s.subdomain)
        )
        .filter(Boolean)
    )
  } catch (err) {
    logger.log.error('Error setting up servers in Redis', err)
  }
}

export default populateServers
