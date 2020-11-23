import Logger from '@portaler/logger'
import config from './config'

const awsCreds = config.awsCreds || undefined
const logger = new Logger('api-server', awsCreds)

export default logger
