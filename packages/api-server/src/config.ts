import { DBConfig, RedisConfig } from '@portaler/types'

interface IConfig {
  cors: {}
  port: number
  host: string
  localUrl: string
  localAuth: string
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

let port = 7777
const host = process.env.HOST || 'http://localhost'

try {
  port =
    process.env.PORT && !Number.isNaN(Number(process.env.PORT))
      ? Number(process.env.PORT)
      : port
} catch (err) {
  // use logger here
}

const localUrl = `${host}:${port}/api`

const config: IConfig = {
  cors: {},
  port,
  host,
  localUrl,
  localAuth: process.env.AUTH_URL!,
  discord: {
    authUrl: `${process.env.DISCORD_AUTH_URL!}&redirect_uri=${
      process.env.DISCORD_REDIRECT_URI
    }&response_type=code&scope=identify%20guilds`,
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
