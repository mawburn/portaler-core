import dotenv from 'dotenv'
dotenv.config()

import bodyParser from 'body-parser'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'

import Auth from './api/auth'
import Health from './api/health'
import config from './config'

const app = express()

app.use(cors(config.cors))
// app.options('cors stuff here', cors(config.cors))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/health', Health)
app.use('/api/auth', Auth)

app.listen(config.port, () =>
  console.log(`App started on port ${config.host}:${config.port}`)
)
