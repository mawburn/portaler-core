import Logger from '@portaler/logger'
import config from './config'

const awsCreds = config.awsCreds || undefined
const logger = new Logger('discord-bot', awsCreds)

export default logger
