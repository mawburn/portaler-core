import { S3Creds } from '@portaler/logger'
import { DBConfig, RedisConfig } from '@portaler/types'

interface BotConfig {
  db: DBConfig
  redis: RedisConfig
  token: string
  roleName: string
  api: string
  awsCreds?: S3Creds
}

const config: BotConfig = {
  db: {
    host: process.env.DB_HOST!,
    user: process.env.POSTGRES_USER!,
    password: process.env.POSTGRES_PASSWORD!,
    database: process.env.POSTGRES_DB!,
    port: Number(process.env.DB_PORT || 5432),
  },
  redis: {
    host: process.env.REDIS_HOST!,
    password: process.env.REDIS_PASSWORD!,
    port: Number(process.env.REDIS_PORT || 6379),
  },
  token: process.env.DISCORD_BOT_TOKEN!,
  roleName: process.env.DISCORD_ROLE!,
  api: 'https://discord.com/api',
}

if (process.env.AWS_SECRET) {
  config.awsCreds = {
    client: {
      accessKeyId: process.env.AWS_KEY!,
      secretAccessKey: process.env.AWS_SECRET!,
    },
    bucket: process.env.AWS_BUCKET!,
  }
}

export default config
