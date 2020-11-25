import { Zone } from '@portaler/types'

import { db } from '../utils/db'
import logger from '../utils/logger'

export let zoneList: Zone[] = []

export const populateZoneList = async () => {
  try {
    const zoneRes = await db.dbQuery(
      `
  SELECT id, zone_name, tier, color
  FROM zones
  WHERE color IN ('road', 'city', 'red', 'black', 'yellow', 'blue')
  ORDER BY zone_name;
  `,
      []
    )

    zoneList = zoneRes.rows.map((z) => ({
      id: z.id,
      name: z.zone_name,
      tier: z.tier,
      color: z.color,
    }))
  } catch (err) {
    logger.log.error('Error fetching zones', err)
    return []
  }
}
