import EventEmitter from 'events'
import winston, { Logger } from 'winston'
import Transport from 'winston-transport'

const emitter = new EventEmitter()

export enum WinstonEvent {
  log = 'winston_log',
}

export interface WinstonLog {
  level:
    | 'emerg'
    | 'alert'
    | 'crit'
    | 'error'
    | 'warning'
    | 'notice'
    | 'info'
    | 'debug'
  message: string
  metadata: {
    service: string
    [key: string]: any
  }
  stack?: string | object
  [key: string]: any
}

class WinstonEventEmit extends Transport {
  constructor(opts = {}) {
    super(opts)
  }

  log(info: object, callback: Function) {
    emitter.emit(WinstonEvent.log, info)

    callback()
  }
}

export const createLogger = (service: string): Logger =>
  winston.createLogger({
    format: winston.format.json(),
    defaultMeta: { service },
    transports: new WinstonEventEmit(),
  })

export default createLogger
