import 'dotenv/config'

import { Client } from 'discord.js'

import { DatabaseConnector } from '@portaler/data-models'
import { DBConfig } from '@portaler/types'

import initEvents from './events'

const client = new Client()
client.login(process.env.DISCORD_BOT_TOKEN)

const dbConfig: DBConfig = {
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_DATABASE!,
  port: Number(process.env.DB_PORT!),
}

const db = new DatabaseConnector(dbConfig)

client.on('ready', () => initEvents({ client, db }))
