import 'dotenv/config'

import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'

import Api from './api'
import Admin from './api/admin'
import Auth from './api/auth'
import config from './config'
import checkAdmin from './middleware/checkAdmin'
import syntaxError from './middleware/syntaxError'
import verifyUser from './middleware/verifyUser'
import { migrations } from './migrations'

// Run DB Migrations
migrations()

const app = express()

app.use(cors(config.cors))
// app.options('cors stuff here', cors(config.cors))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(syntaxError)

app.use('/api/auth', Auth)

app.get('/api/health', (_, res) => res.status(200).send({ server: 'ok' }))
app.get('/api/bot', (_, res) => res.redirect(config.discord.botUrl))

app.use('/api/admin', checkAdmin, Admin)
app.use('/api', verifyUser, Api)

app.listen(config.port, () =>
  console.log(`App started on port ${config.host}:${config.port}`)
)
