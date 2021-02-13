import { Zone } from '@portaler/types'

const callSign = (zone: Zone): string => {
  if (zone.type.startsWith('TUNNEL') && zone.albionId) {
    const callSignArr = zone.type.split('_').slice(1)
    const aid = zone.albionId.split('-')[1]

    const callSign = callSignArr.map((val) => val[0]).join('')

    return `${callSign}-${aid}`
  }

  return ''
}

export default callSign
