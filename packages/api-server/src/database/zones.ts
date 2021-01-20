import { Zone } from '@portaler/types'
import { QueryResult } from 'pg'
import { db } from '../utils/db'

const isOk = (res: PromiseSettledResult<QueryResult<any>>): boolean =>
  res.status === 'fulfilled' && res.value.rowCount > 0

export const getPortalMeta = async (zone: Zone): Promise<Zone> => {
  try {
    const resources = db.dbQuery(
      `
      SELECT resource_type, resource_tier, resource_count
      FROM zone_resources
      WHERE zone_id = $1;
    `,
      [zone.id]
    )

    const mobs = db.dbQuery(
      `
      SELECT mob_name, mob_tier, mob_count
      FROM zone_mobs
      WHERE zone_id = $1;
    `,
      [zone.id]
    )

    const markers = db.dbQuery(
      `
    SELECT marker_type, posx, posy
    FROM zone_markers
    WHERE zone_id = $1;
  `,
      [zone.id]
    )

    const connections = db.dbQuery(
      `
      SELECT z.id, z.zone_name, z.zone_tier, z.zone_type, z.zone_color, z.is_deep_road
      FROM royal_connections as c
      JOIN zones as z ON z.id = c.zone_two
      WHERE c.zone_one = $1;
      `,
      [zone.id]
    )

    const metaDataRes = await Promise.allSettled([
      resources,
      mobs,
      markers,
      connections,
    ])

    if (isOk(metaDataRes[0])) {
      const data = metaDataRes[0].value
    }

    if (isOk(metaDataRes[1])) {
    }

    if (isOk(metaDataRes[2])) {
    }

    if (isOk(metaDataRes[3])) {
    }
  } catch (err) {
    throw err
  }

  return zone
}
