import { ZoneColor } from '@portaler/types'

export const portalSizeToColor = {
  0: '#aa00ff',
  2: '#52b202',
  7: '#00b0ff',
  20: '#ffc400',
}

interface ZoneColorMap {
  [k: string]: string
}

export const getZoneColor = (
  type: ZoneColor,
  isHome: boolean = false,
  isDeep: boolean = false
): string => {
  if (isHome) {
    return '#aa00ff'
  }

  if (isDeep) {
    return '#ff9100'
  }

  switch (type) {
    case 'road':
    case 'road-ho':
      return '#1de9b6'
    case 'black':
      return '#1b1a29'
    case 'red':
      return '#fe0b01'
    case 'yellow':
      return '#ffb002'
    case 'blue':
      return '#3d679c'
    case 'city':
    default:
      return '#42a5f5'
  }
}
