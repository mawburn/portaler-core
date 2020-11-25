import clearPortalInterval from './utils/clearPortalInterval'
import getDb from './utils/db'
import migrations from './utils/migrations'
import populateServers from './utils/populateServers'
import { populateZoneList } from './database/zones'

const initServer = async () => {
  await getDb()
  await migrations()
  await Promise.all([populateZoneList(), populateServers()])

  clearPortalInterval()

  return true
}

export default initServer
