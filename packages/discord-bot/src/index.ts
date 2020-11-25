import 'dotenv/config'

import { Client } from 'discord.js'

import getDatabases from '@portaler/data-models'

import config from './config'
import initEvents from './events'
import logger from './logger'

logger.startUploader()

// Start the bot
;(async () => {
  const client = new Client()
  client.login(process.env.DISCORD_BOT_TOKEN)

  const { db, redis } = await getDatabases(
    config.db,
    config.redis,
    logger.log.info
  )

  client.on('ready', () => {
    logger.log.info('Discord Bot Started')
    initEvents({ client, db, redis })
  })
})()
