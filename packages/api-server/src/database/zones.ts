import { Tier, Zone, ZoneColor } from '@portaler/types'

import { db } from '../utils/db'
import logger from '../utils/logger'

export interface IZoneModel {
  id: number
  albion_id: string
  zone_name: string
  tier: Tier
  zone_type: string
  color: ZoneColor
}

export let zoneList: Zone[] = []

export const populateZoneList = async () => {
  try {
    const zoneRes = await db.dbQuery(
      `
  SELECT *
  FROM zones
  WHERE color IN ('road', 'city', 'red', 'black', 'yellow', 'blue')
  ORDER BY zone_name;
  `,
      []
    )

    zoneList = zoneRes.rows.map((z: IZoneModel) => ({
      id: z.id,
      albionId: z.albion_id,
      name: z.zone_name,
      tier: z.tier,
      color: z.color,
      type: z.zone_type,
    }))
  } catch (err) {
    logger.log.error('Error fetching zones', err)
    return []
  }
}
