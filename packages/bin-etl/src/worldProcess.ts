import { Resource, ZoneColor } from '@portaler/types'

import FullZone, { MapMarker, Mob } from './FullZone'

const getColor = (type: string): ZoneColor => {
  if (type.includes('PLAYERCITY')) {
    return 'city'
  }

  if (type === 'PASSAGE_BLACK') {
    return 'passage-black'
  }

  if (type === 'PASSAGE_RED') {
    return 'passage-red'
  }

  if (type.includes('BLACK')) {
    return 'black'
  }

  if (type.includes('RED')) {
    return 'red'
  }

  if (type.includes('YELLOW')) {
    return 'yellow'
  }

  if (type === 'SAFEAREA') {
    return 'blue'
  }

  if (type.includes('TUNNEL')) {
    if (type.includes('HIDEOUT')) {
      return 'road-ho'
    }

    return 'road'
  }

  return 'home'
}

const getTier = (filename: string): string => {
  const fileParts = filename.split('_')

  let tier = null

  fileParts.forEach((p: string) => {
    if (p.length === 2 && p.startsWith('T')) {
      tier = p.substring(1)
    }
  })

  if (!tier) {
    return '?'
  }

  switch (tier) {
    case '1':
      return 'I'
    case '2':
      return 'II'
    case '3':
      return 'III'
    case '4':
      return 'IV'
    case '5':
      return 'V'
    case '6':
      return 'VI'
    case '7':
      return 'VII'
    case '8':
      return 'VIII'
    default:
      return '?'
  }
}

interface InsertUpdate {
  insertZone: string
  insertConn: string
  insertResources: string[]
  insertMarkers: string[]
  insertMobs: string[]
}

const resourceMapProcess = (
  zId: string,
  resource?: Resource | Resource[]
): string[] => {
  if (!resource) {
    return []
  }

  if (Array.isArray(resource)) {
    return resource.map(
      (r) =>
        `((SELECT id FROM zones WHERE albion_id = '${zId}'), '${
          r.name
        }', ${Number(r.tier)}, ${Number(r.count)})`
    )
  }

  return [
    `((SELECT id FROM zones WHERE albion_id = '${zId}'), '${
      resource.name
    }', ${Number(resource.tier)}, ${Number(resource.count)})`,
  ]
}

const miniMapMarkerProcess = (
  zId: string,
  marker?: MapMarker | MapMarker[]
): string[] => {
  if (!marker) {
    return []
  }

  if (Array.isArray(marker)) {
    return marker.map(
      (m) =>
        `((SELECT id FROM zones WHERE albion_id = '${zId}'), '${
          m.type
        }', ${Number(m.pos.split(' ')[0])}, ${Number(m.pos.split(' ')[1])})`
    )
  }

  return [
    `((SELECT id FROM zones WHERE albion_id = '${zId}'), '${
      marker.type
    }', ${Number(marker.pos.split(' ')[0])}, ${Number(
      marker.pos.split(' ')[1]
    )})`,
  ]
}

const mobCountProcess = (zId: string, mob?: Mob | Mob[]): string[] => {
  if (!mob) {
    return []
  }

  if (Array.isArray(mob)) {
    return mob.map(
      (m) =>
        `((SELECT id FROM zones WHERE albion_id = '${zId}'), '${
          m.name
        }', ${Number(m.count)})`
    )
  }

  return [
    `((SELECT id FROM zones WHERE albion_id = '${zId}'), '${
      mob.name
    }', ${Number(mob.count)})`,
  ]
}

const worldProcess = (worldFile: FullZone[]): string[] => {
  // trim file by type
  const trimmedType = worldFile.filter(
    (z: FullZone) =>
      z.type.startsWith('TUNNEL') ||
      z.type.startsWith('OPENPVP') ||
      z.type.startsWith('SAFEAREA') ||
      z.type.startsWith('PLAYERCITY')
  )

  const valueArr: InsertUpdate[] = trimmedType.map((z: FullZone) => {
    const tier = getTier(z.file)
    const color = getColor(z.type)

    return {
      insertZone: `('${z.id}', '${z.displayname}', '${tier}','${z.type}', '${color}')`,
      insertConn: ``,
      insertResources: resourceMapProcess(z.id, z.distribution.resource),
      insertMarkers: miniMapMarkerProcess(z.id, z.minimapmarkers?.marker),
      insertMobs: mobCountProcess(z.id, z.mobcounts?.mob),
    }
  })

  const insertZoneStatement = `
  INSERT INTO zones (albion_id, zone_name, tier, zone_type, color) VALUES
  ${valueArr.map((v: InsertUpdate) => v.insertZone).join('\n')}
  ON CONFLICT DO NOTHING;
  `

  const insertZoneResources = `
  INSERT INTO zone_resources VALUES
  ${valueArr.map((v: InsertUpdate) => v.insertResources.join('\n'))}
  ON CONFLICT DO NOTHING;
  `

  const insertZoneMarkers = `
  INSERT INTO zone_markers VALUES
  ${valueArr.map((v: InsertUpdate) => v.insertMarkers.join('\n'))}
  ON CONFLICT DO NOTHING;
  `

  const insertZoneMobs = `
  INSERT INTO zone_mobs VALUES
  ${valueArr.map((v: InsertUpdate) => v.insertMobs.join('\n'))}
  ON CONFLICT DO NOTHING;
  `

  return [
    insertZoneStatement,
    insertZoneResources,
    insertZoneMarkers,
    insertZoneMobs,
  ]
}

export default worldProcess
