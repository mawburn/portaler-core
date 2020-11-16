import { DatabaseConnector, RedisConnector } from '@portaler/data-models'
import config from '../config'

const db = new DatabaseConnector(config.db)
const redis = new RedisConnector(config.redis)

const populateServers = async () => {
  const dbServerRes = await db.dbQuery(
    `SELECT id, subdomain FROM servers ORDER BY id`,
    []
  )

  return await Promise.all(
    dbServerRes.rows.map((s) => redis.setAsync(`server:${s.id}`, s.subdomain))
  )
}

export default populateServers
