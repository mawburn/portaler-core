interface IConfig {
  cors: {}
  port: number
  host: string
  localUrl: string
  authUrl: string
  discord: {
    authUrl: string
    redirectUri: string
    apiUrl: string
    bot: string
    public: string
    client: string
    secret: string
  }
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

const config: IConfig = {
  cors: {},
  port,
  host,
  localUrl: `${host}:${port}/api`,
  authUrl: process.env.AUTH_URL!,
  discord: {
    authUrl: process.env.DISCORD_AUTH_URL!,
    redirectUri: process.env.DISCORD_REDIRECT_URI!,
    apiUrl: process.env.DISCORD_API_URL!,
    bot: process.env.DISCORD_BOT_TOKEN!,
    public: process.env.DISCORD_PUBLIC_TOKEN!,
    client: process.env.DISCORD_CLIENT_TOKEN!,
    secret: process.env.DISCORD_SECRET_TOKEN!,
  },
}

export default config
