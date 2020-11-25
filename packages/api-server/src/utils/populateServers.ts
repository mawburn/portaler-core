import { db, redis } from '../db'

const populateServers = async () => {
  const dbServerRes = await db.dbQuery(
    `SELECT id, subdomain FROM servers ORDER BY id;`,
    []
  )

  await Promise.all(
    dbServerRes.rows.map((s: any) =>
      redis.setAsync(`server:${s.id}`, s.subdomain)
    )
  )
}

export default populateServers
