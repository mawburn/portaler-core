import 'dotenv/config'

import { Client } from 'discord.js'

import getDb from './db'
import initEvents from './events'
import logger from './logger'

const client = new Client()

// Start the bot
;(async () => {
  await getDb()

  client.login(process.env.DISCORD_BOT_TOKEN)

  client.on('ready', () => {
    logger.info('Discord Bot Started')
    initEvents(client)
  })
})()
