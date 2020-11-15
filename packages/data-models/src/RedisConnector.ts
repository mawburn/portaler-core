import { promises } from 'fs'
import redis, { RedisClient, ClientOpts } from 'redis'
import { promisify } from 'util'

export default class RedisConnector {
  client: RedisClient
  getAsync: (key: string) => Promise<any>
  setAsync: (key: string, value: string) => Promise<any>
  delAsync: (key: string) => Promise<any>

  constructor(config: ClientOpts) {
    this.client = redis.createClient(config)

    this.getAsync = promisify(this.client.get).bind(this.client)
    this.setAsync = promisify(this.client.set).bind(this.client)
    this.delAsync = promisify(this.client.del).bind(this.client)
  }

  setUser = async (token: string, userId: number, serverId: number) => {
    await Promise.all([
      this.setAsync(token, `${userId}:${serverId}`),
      this.setAsync(`${userId}:${serverId}`, token),
    ])
  }

  getUser = async (token: string): Promise<string> => await this.getAsync(token)

  getToken = async (userId: number, serverId: number) =>
    await this.getAsync(`${userId}:${serverId}`)

  delUser = async (token: string, userId: number, serverId: number) =>
    await Promise.all([
      this.delAsync(token),
      this.delAsync(`${userId}:${serverId}`),
    ])
}
