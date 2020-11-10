import 'dotenv'

interface IConfig {
  cors: {}
  port: number
  host: string
}

let port = 7777
let host = 'localhost'

try {
  port = process.env.port ? Number(process.env.port) : port
  host = process.env.localhost || host
} catch (err) {
  // use logger here
}

const config: IConfig = {
  cors: {},
  port,
  host,
}

export default config
