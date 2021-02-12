import EventEmitter from 'events'

import createLogger, { WinstonEvent, WinstonLog } from '@portaler/logger'

import { db } from './db'

const emitter = new EventEmitter()

emitter.on(WinstonEvent.log, (info: WinstonLog) => {
  try {
    db.Logs.winstonLog(info)
  } catch (err) {
    console.error('Error logging event')
  }
})

const logger = createLogger(process.env.SERVICE ?? 'discord-bot')

export default logger
