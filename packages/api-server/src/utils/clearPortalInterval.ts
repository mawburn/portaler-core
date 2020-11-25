import { db } from './db'
import logger from './logger'

const clearPortalInterval = () =>
  setInterval(async () => {
    try {
      await db.dbQuery('DELETE FROM portals WHERE expires < NOW();', [])
    } catch (err) {
      logger.log.error('Error deleting expired portals', err)
    }
  }, 10000)

export default clearPortalInterval

// setInterval(async () => {
//   try {
//     await db.dbQuery(
//       `
//   DELETE FROM portals
//   WHERE server_id IN (SELECT id FROM servers WHERE subdomain = 'demo' LIMIT 1);
// `,
//       []
//     )
//   } catch (err) {
//     logger.log.error('Error deleting from demo server', err)
//   }
// }, hour * 4)
