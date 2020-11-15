import 'dotenv/config'

import { Client } from 'discord.js'

import { DatabaseConnector } from '@portaler/data-models'

import initEvents from './events'
import config from './config'

const client = new Client()
client.login(process.env.DISCORD_BOT_TOKEN)

const db = new DatabaseConnector(config.db)

client.on('ready', () => initEvents({ client, db }))
