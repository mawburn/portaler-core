import winston, { Logger } from 'winston'
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
  service: string
  metadata?: object
  stack?: string | object
  [key: string]: any
}

export const createLogger = (service: string): Logger =>
  winston.createLogger({
    format: winston.format.json(),
    defaultMeta: { service },
    transports: [new winston.transports.Console()],
  })

export default createLogger
