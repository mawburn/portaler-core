import { DatabaseConnector } from '@portaler/data-models'
import logger from '../logger'

const minute = 60 * 1000
const hour = minute * 60

const clearPortals = (db: DatabaseConnector) => {
  setInterval(async () => {
    try {
      await db.dbQuery('DELETE FROM portals WHERE expires < NOW();', [])
    } catch (err) {
      logger.log.error('Error deleting expired portals', err)
    }
  }, 10000)

  // Clear test server
  setInterval(async () => {
    try {
      await db.dbQuery(
        `
    DELETE FROM portals
    WHERE server_id IN (SELECT id FROM servers WHERE subdomain = 'demo' LIMIT 1);
  `,
        []
      )
    } catch (err) {
      logger.log.error('Error deleting from demo server', err)
    }
  }, hour * 4)
}

export default clearPortals
