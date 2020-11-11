import winston from 'winston'
import Winston from 'winston'

const logger = Winston.createLogger({
  level: 'info',
  format: Winston.format.json(),
  defaultMeta: { service: 'user-service' },
})

export default logger
