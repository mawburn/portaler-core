import { ZoneLight } from '../common/ZoneSearch/zoneSearchUtils'
import { DEFAULT_ZONE } from '../data/constants'

const getHomeZone = (): ZoneLight => {
  const home = window.localStorage.getItem('homeZone')

  if (home) {
    return JSON.parse(home) as ZoneLight
  }

  return DEFAULT_ZONE
}

export default getHomeZone
