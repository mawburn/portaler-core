import { CorsOptions } from 'cors'

import { DBConfig, RedisConfig } from '@portaler/types'

interface IConfig {
  cors: CorsOptions
  port: number
  host: string
  localUrl: string
  discord: {
    authUrl: string
    botUrl: string
    redirectUri: string
    apiUrl: string
    bot: string
    public: string
    client: string
    secret: string
    role: string
  }
  db: DBConfig
  redis: RedisConfig
}

const port = Number(process.env.PORT!)
const host = process.env.HOST!

const localUrl = `${host}${
  process.env.NODE_ENV !== 'production' ? `:${process.env.FRONTEND_PORT}` : ''
}`

const replace = process.env.HOST?.split('.').join('\\.')
const regex = new RegExp(`/${replace}/$`)

const config: IConfig = {
  cors: {
    origin: regex,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  },
  port,
  host,
  localUrl,
  discord: {
    authUrl: `${process.env.DISCORD_AUTH_URL!}&redirect_uri=${encodeURI(
      process.env.DISCORD_REDIRECT_URI!
    )}&response_type=code&scope=identify%20guilds`,
    botUrl: `${process.env.DISCORD_AUTH_URL!}&scope=bot&permissions=${
      process.env.DISCORD_BOT_PERMS
    }`,
    redirectUri: process.env.DISCORD_REDIRECT_URI!,
    apiUrl: process.env.DISCORD_API_URL!,
    bot: process.env.DISCORD_BOT_TOKEN!,
    public: process.env.DISCORD_PUBLIC_TOKEN!,
    client: process.env.DISCORD_CLIENT_TOKEN!,
    secret: process.env.DISCORD_SECRET_TOKEN!,
    role: process.env.DISCORD_ROLE!,
  },
  db: {
    host: process.env.DB_HOST!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_DATABASE!,
    port: Number(process.env.DB_PORT) || 5432,
  },
  redis: {
    host: process.env.REDIS_HOST!,
    password: process.env.REDIS_PASSWORD!,
    port: Number(process.env.REDIS_PORT!),
  },
}

export default config
