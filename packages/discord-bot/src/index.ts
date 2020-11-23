import 'dotenv/config'

import { Client } from 'discord.js'
import logger from './logger'
import initDb from './initDb'

import { DatabaseConnector, RedisConnector } from '@portaler/data-models'

import config from './config'
import initEvents from './events'
import populateServers from './populateServers'

const client = new Client()
client.login(process.env.DISCORD_BOT_TOKEN)

const db = new DatabaseConnector(config.db)
const redis = new RedisConnector(config.redis)

;(async () => await populateServers(db, redis))()

client.on('ready', () => {
  logger.log.info('Discord Bot Started')
  initEvents({ client, db, redis })
})

logger.startUploader()

initDb(db, redis)()

// Clear portals that have expired
// This is in the bot because the bot should only have one instance running
// where as the web server could be multiple
// ....for now
setInterval(
  () => db.dbQuery('DELETE FROM portals WHERE expires < NOW();', []),
  10000
)
