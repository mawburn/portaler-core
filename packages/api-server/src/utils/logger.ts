import createLogger from '@portaler/logger'

import EventEmitter from 'events'
import { WinstonEvent, WinstonLog } from '@portaler/logger'

import { db } from './db'

const emitter = new EventEmitter()

emitter.on(WinstonEvent.log, (info: WinstonLog) => {
  console.log('event')
  try {
    db.Logs.winstonLog(info)
  } catch (err) {
    console.error('Error logging event')
  }
})

const logger = createLogger(process.env.SERVICE ?? 'api-server')

export default logger
