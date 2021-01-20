import md5 from 'md5'

import { Resource } from '@portaler/types'

import { db } from './db'
import FullZone, { MapMarker, Mob } from './FullZone'
import getColor from './getColor'
import getMarker from './getMarker'
import getTier from './getTier'

const fixStr = (str: string) => str.replace(/'/gi, "''")

interface InsertUpdate {
  insertZone?: string
  updateZone?: string
  insertResources: (string | null)[] | null
  insertMarkers: (string | null)[] | null
  insertMobs: (string | null)[] | null
}

interface ZoneIn {
  id: string
  type: string
}

interface ZoneExits {
  [key: string]: {
    in: ZoneIn[]
    out: string[]
  }
}

const resourceMapProcess = (
  zId: string,
  isCity: boolean,
  resource?: Resource | Resource[]
): (string | null)[] | null => {
  if (isCity || !resource) {
    return null
  }

  if (Array.isArray(resource)) {
    return resource
      .map((r) =>
        Number(r.tier) === 1
          ? null
          : `((SELECT id FROM zones WHERE albion_id = '${zId}'), '${fixStr(
              r.name
            )}', '${getTier(r.tier)}', ${r.count})`
      )
      .filter(Boolean)
  }

  return Number(resource.tier) === 1
    ? null
    : [
        `((SELECT id FROM zones WHERE albion_id = '${zId}'), '${fixStr(
          resource.name
        )}', '${getTier(resource.tier)}', ${resource.count})`,
      ]
}

const miniMapMarkerProcess = (
  zId: string,
  isCity: boolean,
  marker?: MapMarker | MapMarker[]
): string[] | null => {
  if (isCity || !marker) {
    return null
  }

  if (Array.isArray(marker)) {
    return marker.map(
      (m) =>
        `((SELECT id FROM zones WHERE albion_id = '${zId}'), '${fixStr(
          getMarker(m.type)
        )}', ${m.pos.split(' ')[0]}, ${m.pos.split(' ')[1]})`
    )
  }

  return [
    `((SELECT id FROM zones WHERE albion_id = '${zId}'), '${fixStr(
      getMarker(marker.type)
    )}', ${marker.pos.split(' ')[0]}, ${marker.pos.split(' ')[1]})`,
  ]
}

const mobCountProcess = (
  zId: string,
  isCity: boolean,
  mob?: Mob | Mob[]
): (string | null)[] | null => {
  if (isCity || !mob || (!Array.isArray(mob) && mob.name.trim() === '')) {
    return null
  }

  if (Array.isArray(mob)) {
    return mob
      .map((m) => {
        const nameArr = m.name.split('_')
        const name = fixStr(nameArr.splice(2).join(' '))
        const tier = getTier(nameArr[0])

        return m.name.trim() === '' || tier === 'I' || tier === '?'
          ? null
          : `((SELECT id FROM zones WHERE albion_id = '${zId}'), '${name}', '${tier}', ${m.count})`
      })
      .filter(Boolean)
  }

  const nameArr = mob.name.split('_')
  const name = nameArr.splice(2).join(' ')
  const tier = getTier(nameArr[0])

  return mob.name.trim() === '' || tier === 'I' || tier === '?'
    ? null
    : [
        `((SELECT id FROM zones WHERE albion_id = '${zId}'), '${name}', '${tier}', ${mob.count})`,
      ]
}

const worldProcess = async (worldFile: FullZone[]): Promise<string[]> => {
  // trim file by type
  const trimmedType = worldFile.filter(
    (z: FullZone) =>
      (z.type.startsWith('TUNNEL') ||
        z.type.startsWith('OPENPVP') ||
        z.type.startsWith('SAFEAREA') ||
        z.type.startsWith('PLAYERCITY') ||
        z.type.startsWith('PASSAGE')) &&
      !z.displayname.toLowerCase().includes('debug') &&
      !z.type.includes('DUNGEON_') &&
      !z.type.includes('EXPEDITION_') &&
      !z.type.includes('ARENA_') &&
      !z.type.includes('_NOFURNITURE') &&
      !z.id.includes('RoadPve') &&
      !z.id.includes('ChampionsRealmLive') &&
      z.type !== 'PASSAGE_SAFEAREA'
  )

  const zones = await db.dbQuery(`
    SELECT albion_id, zone_name, tier, zone_type, color, is_deep_road
    FROM zones;
  `)

  const zoneHashes = new Map<string, [string, string]>()

  zones.rows.forEach((r) => {
    const hashStr = `${r.albion_id}${r.zone_name}${r.tier}${r.zone_type}${r.color}${r.is_deep_road}`.toUpperCase()
    zoneHashes.set(r.albion_id, [hashStr, md5(hashStr)])
  })

  const zoneExits: ZoneExits = {}

  const valueArr: InsertUpdate[] = trimmedType.map((z: FullZone) => {
    const tier = getTier(z.file)
    const color = getColor(z.type)

    if (z.exits?.exit) {
      if (Array.isArray(z.exits.exit)) {
        zoneExits[z.id] = {
          out: z.exits.exit.map((e) => e.id.slice(0, 36)),
          in: z.exits.exit.map((e) => ({
            id: e.targetid.slice(0, 36),
            type: e.targettype,
          })),
        }
      } else {
        zoneExits[z.id] = {
          out: [z.exits.exit.id.slice(0, 36)],
          in: [
            {
              id: z.exits.exit.targetid.slice(0, 36),
              type: z.exits.exit.targettype,
            },
          ],
        }
      }
    }

    // TODO query all zones and see if anything has changed or if it exists
    const retObj: InsertUpdate = {
      insertResources: resourceMapProcess(
        z.id,
        color === 'city',
        z.distribution.resource
      ),
      insertMarkers: miniMapMarkerProcess(
        z.id,
        color === 'city',
        z.minimapmarkers?.marker
      ),
      insertMobs: mobCountProcess(z.id, color === 'city', z.mobcounts?.mob),
    }

    const isDeep = (color.includes('road') && z.type.includes('DEEP'))
      .toString()
      .toUpperCase()

    const oldHash = zoneHashes.get(z.id)

    if (!oldHash) {
      retObj.insertZone = `('${z.id}', '${fixStr(
        z.displayname
      )}', '${tier}','${fixStr(z.type)}', '${color}', ${isDeep})`
    } else {
      const hashStr = `${z.id}${z.displayname}${tier}${z.type}${color}${isDeep}`.toUpperCase()
      const newHash = md5(hashStr)

      if (oldHash[1] !== newHash) {
        retObj.updateZone = `UPDATE zones SET zone_name = '${fixStr(
          z.displayname
        )}', tier = '${tier}', zone_type = '${fixStr(
          z.type
        )}', color = '${color}', is_deep_road = ${isDeep}
        WHERE albion_id = '${z.id}';`
      }
    }

    return retObj
  })

  const insertValues = valueArr
    .map((v: InsertUpdate) => v.insertZone)
    .filter(Boolean)
    .join(',\n')

  const insertZoneStatement = !insertValues.length
    ? 'SELECT NOW();'
    : `
  INSERT INTO zones (albion_id, zone_name, tier, zone_type, color, is_deep_road) VALUES
  ${insertValues}
  ON CONFLICT DO NOTHING;
  `

  const updateZoneStatement = valueArr
    .map((v: InsertUpdate) => v.updateZone)
    .filter(Boolean)
    .join('\n')

  // we don't need to check for changes, we just need to reload everything
  const flatResources = valueArr
    .map((v: InsertUpdate) => v.insertResources?.filter(Boolean).flat())
    .filter(Boolean)
    .flat()

  const insertZoneResources = `
  TRUNCATE TABLE zone_resources;
  INSERT INTO zone_resources (zone_id, resource_type, resource_tier, resource_count) VALUES
  ${flatResources.join(',\n')};
  `

  // we don't need to check for changes, we just need to reload everything
  const flatMarkers = valueArr
    .map((v: InsertUpdate) => v.insertMarkers?.filter(Boolean).flat())
    .filter(Boolean)
    .flat()

  const insertZoneMarkers = `
  TRUNCATE TABLE zone_markers;
  INSERT INTO zone_markers (zone_id, marker_type, posX, posY) VALUES
  ${flatMarkers.join(',\n')};
  `

  // we don't need to check for changes, we just need to reload everything
  const flatMobs = valueArr
    .map((v: InsertUpdate) => v.insertMobs?.filter(Boolean).flat())
    .filter(Boolean)
    .flat()

  const insertZoneMobs = `
  TRUNCATE TABLE zone_mobs;
  INSERT INTO zone_mobs (zone_id, mob_name, mob_tier, mob_count) VALUES
  ${flatMobs.join(',\n')};
  `

  // Create Connections
  const connections: [string, string, string][] = []

  for (const [key, value] of Object.entries(zoneExits)) {
    value.in.forEach((inVal) => {
      for (const [k, v] of Object.entries(zoneExits)) {
        if (v.out.includes(inVal.id)) {
          connections.push([key, k, inVal.type])
          break
        }
      }
    })
  }

  const insertConnections = `
  TRUNCATE TABLE royal_connections;
  INSERT INTO royal_connections (zone_one, zone_two, conn_type) VALUES
  ${connections
    .map(
      (c) =>
        `((SELECT id FROM zones WHERE albion_id = '${c[0]}'), (SELECT id FROM zones WHERE albion_id = '${c[1]}'), '${c[2]}')`
    )
    .join(',\n')}
    ON CONFLICT DO NOTHING;
  `

  return [
    insertZoneStatement,
    updateZoneStatement,
    insertZoneResources,
    insertZoneMarkers,
    insertZoneMobs,
    insertConnections,
  ]
}

export default worldProcess
