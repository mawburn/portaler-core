import { Guild } from 'discord.js'

import config from '../config'
import { dbQuery } from '../db'

/**
 * Adds a server to the database
 * @param  guild
 * @param  userId
 * @returns true if exists or false if not exists
 */
export const addServer = async (guild: Guild): Promise<boolean> => {
  const roleData = await guild.roles.fetch()

  const roleId = roleData.cache.find(
    (r) => r.name.toLowerCase() === config.discord.role
  )

  const { rows: serverRows } = await dbQuery(
    `
    INSERT INTO servers(discord_id, discord_name)
    VALUES ($1, $2) RETURNING id
    `,
    [guild.id, guild.name]
  )

  const serverId = serverRows[0].id

  if (roleId) {
    await dbQuery(
      `INSERT INTO roles(server_id, discord_role_id) VALUES ($1, $2)`,
      [serverId, roleId.id]
    )

    return Promise.resolve(true)
  }

  return Promise.resolve(false)
}
/**
 * Gets a role id based on server id
 * @param  discordServerId
 * @returns null if no role is found
 */
export const getRoleId = async (
  discordServerId: string
): Promise<{ id: number; discord: string } | null> => {
  const { rows } = await dbQuery(
    `
    SELECT r.id AS id, r.discord_role_id AS discord
    FROM servers AS s
    JOIN roles AS r ON r.server_id = s.id
    WHERE s.discord_id = $1
    `,
    [discordServerId]
  )

  if (rows.length) {
    return Promise.resolve({ id: rows[0].id, discord: rows[0].discord })
  }

  return Promise.resolve(null)
}
/**
 * Add a role to a server
 * @param  discordServerId
 * @param  discordRoleId
 */
export const addRole = async (
  discordServerId: string,
  discordRoleId: string
) => {
  const {
    rows: serverRows,
  } = await dbQuery(`SELECT id FROM servers WHERE discord_id = $1`, [
    discordServerId,
  ])

  if (serverRows.length) {
    await dbQuery(
      `INSERT INTO roles(server_id, discord_role_id) VALUES ($1, $2)`,
      [serverRows[0].id, discordRoleId]
    )
  }

  return null
}
/**
 * Update a role in the table
 * @param  discordServerId
 * @param  discordRoleId
 */
export const updateRole = async (
  discordServerId: string,
  discordRoleId: string
) => {
  const {
    rows: serverRows,
  } = await dbQuery(`SELECT id FROM servers WHERE discord_id = $1`, [
    discordServerId,
  ])

  if (serverRows.length) {
    await dbQuery(
      `UPDATE roles SET discord_role_id = $1 WHERE server_id = $2`,
      [discordRoleId, serverRows[0].id]
    )
  }

  return null
}
