import { ZoneColor } from '@portaler/types'

const getColor = (type: string): ZoneColor => {
  if (type.includes('PLAYERCITY')) {
    return 'city'
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

export default getColor
