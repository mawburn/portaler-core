import 'dotenv/config'

import { Client } from 'discord.js'

import { DatabaseConnector, RedisConnector } from '@portaler/data-models'

import config from './config'
import initEvents from './events'
import populateServers from './populateServers'

const client = new Client()
client.login(process.env.DISCORD_BOT_TOKEN)

const db = new DatabaseConnector(config.db)
const redis = new RedisConnector(config.redis)

;async () => await populateServers(db, redis)

client.on('ready', () => initEvents({ client, db, redis }))
