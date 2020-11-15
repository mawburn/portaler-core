import { Guild } from 'discord.js'

import { DatabaseConnector } from '@portaler/data-models'

import config from '../../config'

const setupServer = async (server: Guild, db: DatabaseConnector) => {
  const rolePayload = {
    name: config.roleName,
    permissions: 0,
    color: '#aa00ff',
    hoist: false,
    mentionableRole: false,
  }

  try {
    const role = await server.roles.create({
      data: rolePayload,
      reason: 'Add authentication for Portaler.zone',
    })

    const serverId = await db.Server.create(server.id, server.name)
    await db.Server.createRole(serverId, role.id)
  } catch (err) {
    console.error(err)
  }
}

export default setupServer
