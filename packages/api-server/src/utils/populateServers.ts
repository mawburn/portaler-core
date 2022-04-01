import { db, redis } from './db'
import logger from './logger'

const populateServers = async () => {
  try {
    const dbServerRes = await db.dbQuery(
      `SELECT id, instance_path, is_public FROM servers ORDER BY id;`,
      []
    )

    const path: Promise<any>[] = []
    const ids: Promise<any>[] = []

    dbServerRes.rows.map((s: any) => {
      if (s.path) {
        redis.setAsync(`server:${s.id}`, s.path)
        redis.setAsync(
          `server:${s.path}`,
          JSON.stringify({ isPublic: s.is_public, serverId: s.id })
        )
      }
    })

    await Promise.all([...path, ...ids])
  } catch (err) {
    logger.error('Error setting up servers in Redis', { error: err })
  }
}

export default populateServers
