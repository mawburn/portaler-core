import { DBConfig, RedisConfig } from '@portaler/types'

interface BotConfig {
  db: DBConfig
  redis: RedisConfig
  token: string
  roleName: string
  api: string
}

const config: BotConfig = {
  db: {
    host: process.env.DB_HOST!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_DATABASE!,
    port: Number(process.env.DB_PORT!),
  },
  redis: {
    host: process.env.REDIS_HOST!,
    password: process.env.REDIS_PASSWORD!,
    port: Number(process.env.REDIS_PORT!),
  },
  token: process.env.DISCORD_BOT_TOKEN!,
  roleName: process.env.DISCORD_ROLE!,
  api: process.env.DISCORD_API!,
}

export default config
