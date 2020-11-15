import { GuildMember } from 'discord.js'
import { QueryResult } from 'pg'

import { DiscordMe, DiscordMeGuild } from '@portaler/types'

import ServerModel, { IServerModel } from './Server'

interface ServerRoleId {
  serverId: string
  roleId: string
}

export interface IUserModel {
  id: number
  discordId: string
  discordName: string
  serverAccess?: ServerRoleId[]
  discordRefresh?: string | null
  createdOn: Date
}

export default class UserModel {
  private query: (
    query: string,
    params: (string | number)[]
  ) => Promise<QueryResult>

  constructor(
    dbQuery: (
      query: string,
      params: (string | number)[]
    ) => Promise<QueryResult>
  ) {
    this.query = dbQuery
  }

  createUser = async (
    member: GuildMember,
    serverId: number,
    roles: number[]
  ) => {
    try {
      const user = await this.getUserByDiscord(member.user.id)

      let userId = user ? user.id : null

      if (!userId) {
        const dbResUser = await this.query(
          `
          INSERT INTO users(discord_id, discord_name, discord_discriminator)
          VALUES ($1, $2, $3 RETURNING id;
          `,
          [member.user.id, member.user.username, member.user.discriminator]
        )

        userId = dbResUser.rows[0].id
      }

      if (userId === null) {
        throw new Error('NoUserFound')
      }

      const adds = []

      adds.push(
        this.query(
          `INSERT INTO user_servers(user_id, server_id) VALUES($1, $2)`,
          [userId, serverId]
        )
      )

      roles.forEach((r) => {
        adds.push(
          this.query(
            `INSERT INTO user_roles(user_id, role_id) VALUES($1, $2)`,
            [userId!, r]
          )
        )
      })

      return await Promise.all(adds)
    } catch (err) {
      throw err
    }
  }

  createLogin = async (
    userInfo: DiscordMe,
    servers: DiscordMeGuild[],
    refreshToken: string
  ): Promise<number> => {
    if (!userInfo.username) {
      throw new Error('NoUsername')
    }

    if (!userInfo.discriminator) {
      throw Error('NoUserDiscriminator')
    }

    if (!refreshToken) {
      throw Error('NoRefreshToken')
    }

    try {
      const serverModel = new ServerModel(this.query)

      const existingServers: IServerModel[] = await Promise.all(
        servers.map(async (s) => await serverModel.getServer(s.id))
      )

      if (existingServers.length === 0) {
        throw Error('NoServersFoundForUser')
      }

      const dbResUser = await this.query(
        `
      INSERT INTO users(discord_id, discord_name, discord_discriminator, discord_refresh)
      VALUES ($1, $2, $3, $4) RETURNING id;
      `,
        [userInfo.id, userInfo.username, userInfo.discriminator, refreshToken]
      )

      const userId = dbResUser.rows[0].id

      await Promise.all(
        existingServers.map(
          async (s) =>
            await this.query(
              `INSERT INTO user_servers(user_id, server_id) VALUES($1, $2)`,
              [userId, s.id]
            )
        )
      )

      return userId
    } catch (err) {
      throw new Error(err)
    }
  }

  addRoles = async (userId: number, roleIds: number[]): Promise<boolean> => {
    const adds = roleIds.map((r) =>
      this.query(`INSERT INTO user_roles(user_id, role_id) VALUES($1, $2)`, [
        userId,
        r,
      ])
    )

    await Promise.all(adds)

    return true
  }

  getUserByDiscord = async (userId: string): Promise<IUserModel | null> => {
    const dbResUser = await this.query(
      `SELECT * FROM users WHERE discord_id = $1`,
      [userId]
    )

    if (dbResUser.rowCount === 0) {
      return null
    }

    const fRow = dbResUser.rows[0]

    const user: IUserModel = {
      id: fRow.id,
      discordId: fRow.discord_id,
      discordName: `${fRow.discord_name}#${fRow.discriminator}`,
      discordRefresh: fRow.refresh,
      createdOn: fRow.created_on,
    }

    return user
  }

  getFullUser = async (
    userId: number | string,
    serverId: number
  ): Promise<IUserModel> => {
    const dbResUser = await this.query(
      `
      SELECT u.id AS id,
        u.discord_id AS discord_id,
        u.discord_name AS discord_name,
        u.discord_discriminator AS discriminator,
        u.discord_refresh AS refresh,
        u.created_on AS created_on
        sr.server_id AS server_id,
        sr.discord_role_id AS role_id
      FROM users AS u
      JOIN user_servers AS us ON us.user_id = u.id
      JOIN server_roles AS sr ON sr.id = us.server_id
      JOIN user_roles AS ur ON ur.user_id = u.id AND ur.role_id = sr.id
      WHERE ${typeof userId === 'string' ? 'u.discord_id' : 'u.id'} = $1
        AND sr.server_id = $2
    `,
      [userId, serverId]
    )

    const fRow = dbResUser.rows[0]

    const user: IUserModel = {
      id: fRow.id,
      discordId: fRow.discord_id,
      discordName: `${fRow.discord_name}#${fRow.discriminator}`,
      discordRefresh: fRow.refresh,
      createdOn: fRow.created_on,
      serverAccess: dbResUser.rows.map((r) => ({
        serverId: r.server_id,
        roleId: r.role_id,
      })),
    }

    return user
  }

  removeUserRoles = async (userId: number, roleIds: number[]) =>
    await Promise.all(
      roleIds.map((r) =>
        this.query(
          `DELETE FROM user_roles WHERE user_id = $1 AND role_id = $2`,
          [userId, r]
        )
      )
    )

  removeUserServer = async (userId: number, serverId: number) =>
    await this.query(
      `DELETE FROM user_servers WHERE user_id = $1 AND server_id = $2`,
      [userId, serverId]
    )
}
