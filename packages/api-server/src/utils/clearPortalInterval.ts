import { db } from './db'
import logger from './logger'

const clearPortalInterval = () =>
  setInterval(async () => {
    try {
      await db.dbQuery('DELETE FROM portals WHERE expires < NOW();')
    } catch (err) {
      logger.log.error('Error deleting expired portals', err)
    }
  }, 10000)

export default clearPortalInterval
