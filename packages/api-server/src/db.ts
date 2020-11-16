import { DatabaseConnector, RedisConnector } from '@portaler/data-models'

import config from './config'

export const db = new DatabaseConnector(config.db)
export const redis = new RedisConnector(config.db)
