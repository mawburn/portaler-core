import { QueryResult } from 'pg'

import {
  IZoneModel,
  Marker,
  Mob,
  Resource,
  Zone,
  ZoneLite,
} from '@portaler/types'

import { db, redis } from '../utils/db'

export const getZoneMeta = async (id: number): Promise<Zone> => {
  try {
    const zoneRedis = await redis.getZone(id)

    if (zoneRedis) {
      return JSON.parse(zoneRedis)
    }
  } catch (err) {
    // do nothing
  }

  try {
    const zoneRes: Promise<
      QueryResult<IZoneModel>
    > = db.dbQuery(`SELECT * FROM zones WHERE id = $1;`, [id])

    const resources = db.dbQuery(
      `
      SELECT resource_type, resource_tier, resource_count
      FROM zone_resources
      WHERE zone_id = $1;
    `,
      [id]
    )

    const mobs = db.dbQuery(
      `
      SELECT mob_name, mob_tier, mob_count
      FROM zone_mobs
      WHERE zone_id = $1;
    `,
      [id]
    )

    const markers = db.dbQuery(
      `
    SELECT marker_type, posx, posy
    FROM zone_markers
    WHERE zone_id = $1;
  `,
      [id]
    )

    const connections = db.dbQuery(
      `
      SELECT
        z.id as id,
        z.zone_name as name,
        z.tier as tier,
        z.zone_type as type,
        z.color as color
      FROM royal_connections as c
      JOIN zones as z ON z.id = c.zone_two
      WHERE c.zone_one = $1;
      `,
      [id]
    )

    const metaDataRes = await Promise.all([
      zoneRes,
      resources,
      mobs,
      markers,
      connections,
    ])

    const zoneRow = metaDataRes[0].rows[0]

    const zone: Zone = {
      id: zoneRow.id,
      albionId: zoneRow.albion_id,
      name: zoneRow.zone_name,
      tier: zoneRow.tier,
      color: zoneRow.color,
      type: zoneRow.zone_type,
      isDeep: zoneRow.is_deep_road,
    }

    const resourcesData: Resource[] = metaDataRes[1].rows.map((r) => ({
      name: r.resource_type,
      tier: r.resource_tier,
      count: r.resource_count,
    }))

    const mobsData: Mob[] = metaDataRes[2].rows.map((m) => ({
      name: m.mob_name,
      tier: m.mob_tier,
      count: m.mob_count,
    }))

    const markersData: Marker[] = metaDataRes[3].rows.map((m) => ({
      name: m.marker_type,
      pos: [m.posx, m.posy],
    }))

    const connData: ZoneLite[] = metaDataRes[4].rows.map((z) => ({
      id: z.id,
      name: z.name,
      tier: z.tier,
      type: z.type,
      color: z.color,
    }))

    zone.info = {
      markers: markersData,
      resources: resourcesData,
      mobs: mobsData,
      royalConnections: connData,
    }

    await redis.setZone(zone)
    return zone
  } catch (err) {
    throw err
  }
}
