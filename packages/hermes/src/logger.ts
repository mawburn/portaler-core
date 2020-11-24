import Logger from '@portaler/logger'
import config from './config'

const awsCreds = config.awsCreds || undefined
const logger = new Logger('hermes', awsCreds)

export default logger
