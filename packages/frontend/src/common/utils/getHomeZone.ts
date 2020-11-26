import { Zone } from '@portaler/types'
import { DEFAULT_ZONE } from '../data/constants'

const getHomeZone = (): Zone => {
  const home = window.localStorage.getItem('homeZone')

  if (home) {
    return JSON.parse(home) as Zone
  }

  return DEFAULT_ZONE
}

export default getHomeZone
