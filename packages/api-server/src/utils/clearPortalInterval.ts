import { db } from './db'
import logger from './logger'

const clearPortalInterval = () =>
  setInterval(async () => {
    try {
      await db.dbQuery(`
        DELETE FROM portals WHERE expires < NOW();
        DELETE FROM portals WHERE size = 0 AND
          conn1 NOT IN (SELECT conn1 FROM portals WHERE size <> 0) AND
          conn1 NOT IN (SELECT conn2 FROM portals WHERE size <> 0) AND
          conn2 NOT IN (SELECT conn1 FROM portals WHERE size <> 0) AND
          conn2 NOT IN (SELECT conn2 FROM portals WHERE size <> 0);
      `)
    } catch (err) {
      logger.error({ message: 'Error deleting expired portals', error: err })
    }
  }, 10000)

export default clearPortalInterval
