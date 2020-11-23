import { DatabaseConnector, RedisConnector } from '@portaler/data-models'
import { Zone } from '@portaler/types'

import logger from './logger'

/**
 * Because we should only have 1 instance of the bot running, we can use it to initialize things
 */
const initDb = (db: DatabaseConnector, redis: RedisConnector) => async () => {
  try {
    const zoneRes = await db.dbQuery(
      `
    SELECT id, zone_name, tier, color
    FROM zones
    WHERE color IN ('road', 'city', 'red', 'black', 'yellow', 'blue')
    ORDER BY zone_name
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

export default initDb
