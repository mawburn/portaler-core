import 'dotenv/config'

import { Client } from 'discord.js'

import initEvents from './events'
import logger from './logger'

const client = new Client()

// Start the bot
;(async () => {
  client.login(process.env.DISCORD_BOT_TOKEN)

  client.on('ready', () => {
    logger.info('Discord Bot Started')
    initEvents(client)
  })
})()
