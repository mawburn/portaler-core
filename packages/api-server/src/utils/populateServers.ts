import { db, redis } from './db'
import logger from './logger'

const populateServers = async () => {
  try {
    const dbServerRes = await db.dbQuery(
      `SELECT id, subdomain, is_public FROM servers ORDER BY id;`,
      []
    )

    const subdomains: Promise<any>[] = []
    const ids: Promise<any>[] = []

    dbServerRes.rows.map((s: any) => {
      if (s.subdomain) {
        redis.setAsync(`server:${s.id}`, s.subdomain)
        redis.setAsync(
          `server:${s.subdomain}`,
          JSON.stringify({ isPublic: s.is_public, serverId: s.id })
        )
      }
    })

    await Promise.all([...subdomains, ...ids])
  } catch (err) {
    logger.log.error('Error setting up servers in Redis', err)
  }
}

export default populateServers
