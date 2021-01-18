import { ZoneColor } from '@portaler/types'

import FullZone from './FullZone'

const insertStatement = `INSERT INTO table_name(column_list) 
VALUES(value_list)
ON CONFLICT target action;`

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
  insert: string
  update: {
    id: string
    setStr: string
  }
}

const worldProcess = (worldFile: FullZone[]) => {
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
      insert: `('${z.id}', '${z.displayname}', '${tier}','${z.type}', '${color}')`,
      update: {
        id: z.id,
        setStr: `zone_name = ${z.displayname}, tier = ${tier}, zone_type = ${z.type}, color = ${color}`,
      },
    }
  })

  const insertStatement = `
  INSERT INTO zones (albion_id, zone_name, tier, zone_type, color) VALUES
  ${valueArr.map((v: InsertUpdate) => v.insert).join('\n')}
  ON CONFLICT DO NOTHING;`
}

export default worldProcess
