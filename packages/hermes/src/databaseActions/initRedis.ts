import { DatabaseConnector, RedisConnector } from '@portaler/data-models'
import { Zone } from '@portaler/types'

import logger from '../logger'

const initRedis = async (db: DatabaseConnector, redis: RedisConnector) => {
  try {
    // Populate redis cache with servers
    const dbServerRes = await db.dbQuery(
      `SELECT id, subdomain FROM servers ORDER BY id;`,
      []
    )

    await Promise.all(
      dbServerRes.rows.map((s: any) =>
        redis.setAsync(`server:${s.id}`, s.subdomain)
      )
    )

    const zoneRes = await db.dbQuery(
      `
    SELECT id, zone_name, tier, color
    FROM zones
    WHERE color IN ('road', 'city', 'red', 'black', 'yellow', 'blue')
    ORDER BY zone_name;
    `,
      []
    )

    const zones: Zone[] = zoneRes.rows.map((z) => ({
      id: z.id,
      name: z.zone_name,
      tier: z.tier,
      color: z.color,
    }))

    await redis.setAsync('zones', JSON.stringify(zones))
  } catch (err) {
    logger.log.error('Error populating Redis with Zone data', err)
  }
}

export default initRedis
