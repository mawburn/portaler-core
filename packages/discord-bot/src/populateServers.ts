import { DatabaseConnector, RedisConnector } from '@portaler/data-models'
import migrations from './migrations'

const populateServers = async (
  db: DatabaseConnector,
  redis: RedisConnector
) => {
  await migrations()

  const dbServerRes = await db.dbQuery(
    `SELECT id, subdomain FROM servers ORDER BY id`,
    []
  )

  return await Promise.all(
    dbServerRes.rows.map((s) => redis.setAsync(`server:${s.id}`, s.subdomain))
  )
}

export default populateServers
