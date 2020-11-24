import 'dotenv/config'

import retry from 'async-retry'
import { Client } from 'discord.js'
import fetch from 'node-fetch'

import { DatabaseConnector, RedisConnector } from '@portaler/data-models'

import config from './config'
import initEvents from './events'
import logger from './logger'

logger.startUploader()

// Start the bot
;(async () => {
  await retry(
    async () => {
      const hermes = await fetch('http://localhost:3434/health').then((res) =>
        res.json()
      )

      if (!hermes.serverReady) {
        throw new Error('Database not ready')
      } else {
        return true
      }
    },
    {
      retries: 100,
      randomize: false,
    }
  )

  const client = new Client()
  client.login(process.env.DISCORD_BOT_TOKEN)

  const db = new DatabaseConnector(config.db)
  const redis = new RedisConnector(config.redis)

  client.on('ready', () => {
    logger.log.info('Discord Bot Started')
    initEvents({ client, db, redis })
  })
})()
