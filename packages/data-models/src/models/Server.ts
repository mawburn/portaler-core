import { QueryResult } from 'pg'

interface ServerRoles {
  id: number
  discordRoleId: string
  lastUpdated: string
}

export interface IServerModel {
  id: number
  discordId: string
  discordName: string
  roles: ServerRoles[]
  subdomain?: string | null
  createdOn: Date
}

export default class ServerModel {
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

  create = async (discordId: string, discordName: string): Promise<number> => {
    const dbResServer = await this.query(
      `
      INSERT INTO servers(discord_id, discord_name)
      VALUES ($1, $2) RETURNING id;
    `,
      [discordId, discordName]
    )

    return dbResServer.rows[0].id
  }

  createRole = async (serverId: number, roleId: string): Promise<number> => {
    const dbResRole = await this.query(
      `INSERT INTO server_roles(server_id, discord_role_id) VALUES($1, $2) RETURNING id`,
      [serverId, roleId]
    )

    return dbResRole.rows[0].id
  }

  getServer = async (id: number | string): Promise<IServerModel | null> => {
    try {
      const queryString = `
      SELECT
        s.id AS id,
        s.discord_id AS discord_id,
        s.discord_name AS discord_name,
        s.subdomain AS subdomain,
        s.created_on AS created_on,
        sr.id AS role_id,
        sr.discord_role_id AS discord_role_id,
        sr.last_updated AS role_last_updated
      FROM servers AS s
      LEFT JOIN server_roles AS sr ON sr.server_id = s.id
      WHERE ${typeof id === 'number' ? 's.id' : 's.discord_id'} = $1
    `

      const dbResServer = await this.query(queryString, [id])

      if (dbResServer.rowCount === 0) {
        throw new Error('NoServerFound')
      }

      const fRow = dbResServer.rows[0]

      const server: IServerModel = {
        id: fRow.id,
        discordId: fRow.discord_id,
        discordName: fRow.discord_name,
        subdomain: fRow.subdomain,
        createdOn: fRow.created_on,
        roles: dbResServer.rows.map((r) => ({
          id: r.role_id,
          discordRoleId: r.discord_role_id,
          lastUpdated: r.role_last_updated,
        })),
      }

      return server
    } catch (err) {
      // TODO add logging here
      return null
    }
  }

  getServerIdBySubdomain = async (subDomain: string): Promise<number> => {
    const dbResServer = await this.query(
      `SELECT discord_id FROM servers WHERE subdomain = $1`,
      [subDomain]
    )

    if (dbResServer.rowCount === 0) {
      throw new Error('NoServerFound')
    }

    return dbResServer.rows[0].id
  }
}
