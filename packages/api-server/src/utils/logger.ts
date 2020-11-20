import winston from 'winston'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.json()),
  defaultMeta: { service: 'user-service' },
  transports: [new winston.transports.Console()],
})

export default logger
