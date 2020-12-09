import { Router } from 'express'
import fetch from 'node-fetch'

import config from '../utils/config'
import { db, redis } from '../utils/db'
import logger from '../utils/logger'

const alphaTest = new RegExp(/^[a-z0-9]+$/gi)

const router = Router()

// Lists all our servers
router.get('/list', async (req, res) => {
  try {
    const dbServerRes = await db.dbQuery(
      `SELECT * FROM servers ORDER BY id`,
      []
    )

    const servers = dbServerRes.rows.map((s: any) => ({
      id: s.id,
      discordId: s.discord_id,
      discordName: s.discord_name,
      subdomain: s.subdomain,
      createdOn: s.created_on,
    }))

    return res.status(200).json(servers)
  } catch (err) {
    logger.log.error('No Server', err)
    return res.status(500).send(err)
  }
})

// adds a subdomain to a server
router.post('/addSubdomain', async (req, res) => {
  try {
    const body = req.body
    const discordUrl = req.body.discordUrl || null

    if (
      typeof body.id !== 'number' ||
      (typeof body.subdomain !== 'string' && alphaTest.test(body.subdomain))
    ) {
      throw new Error('BadPayload')
    }

    // configure your own DNS service
    if (config.dns) {
      const dnsOk = await fetch(config.dns, {
        method: 'POST',
        body: JSON.stringify({ subdomain: body.subdomain }),
      }).then((res) => res.ok)

      if (!dnsOk) {
        throw new Error('DNS Config Error')
      }
    }

    await db.dbQuery(
      `UPDATE servers SET subdomain = $1, is_public = $2, discord_url = $3 WHERE id = $4`,
      [body.subdomain, !!body.isPublic, discordUrl, body.id]
    )

    const server = await db.Server.getServer(body.id)

    if (server && server.subdomain) {
      await redis.setAsync(`server:${server.id}`, server.subdomain)
      await redis.setAsync(
        `server:${server.subdomain}`,
        JSON.stringify({
          isPublic: server.isPublic,
          serverId: server.id,
          discordUrl: server.discordUrl,
        })
      )
    }

    return res.status(200).send(server)
  } catch (err) {
    logger.log.error('Subdomain', err)
    return res.status(500).json({ error: err.message })
  }
})

// // Gets a single server
// router.get('/server', async (req, res) => {
//   const discordId = req.query.id

//   if (!discordId && typeof discordId !== 'string') {
//     return res.send(400)
//   }

//   const dbServer = await db.Server.getServer(discordId as string)

//   if (dbServer) {
//     return res.status(200).send(dbServer)
//   }

//   res.send(404)
// })

// // adds a server
// router.post('/server', async (req, res) => {
//   const { discordId, discordName } = req.body

//   if (discordId || discordName) {
//     res.send(400)
//     return
//   }

//   try {
//     const serverId = await db.Server.create(discordId, discordName)

//     return res.status(200).send({ id: serverId })
//   } catch (err) {
//     logger.log.error('Error setting server', discordId, discordName)
//   }

//   res.send(500)
// })

// // create a role for a server
// router.post('/server/roles', async (req, res) => {
//   const { serverId, roleId } = req.body

//   if (serverId || roleId) {
//     res.send(400)
//     return
//   }

//   const serverRoleId = await db.Server.createRole(serverId, roleId)

//   if (serverRoleId) {
//     return res.status(200).send({ id: serverRoleId })
//   }
// })

// // removes a server and its associations
// router.delete('/server', async (req, res) => {
//   const { discordId, discordName } = req.body

//   if (discordId || discordName) {
//     res.send(400)
//     return
//   }

//   try {
//     const dbRes = await db.dbQuery(
//       'DELETE FROM servers WHERE discord_id = $1 RETURNING id',
//       [discordId]
//     )

//     const serverId = dbRes.rows[0].id

//     const dbUserIds = await db.dbQuery(
//       'DELETE FROM user_servers WHERE server_id = $1 RETURNING user_id',
//       [serverId]
//     )

//     const dbRolesRes = await db.dbQuery(
//       'DELETE FROM server_roles WHERE server_id = $1 RETURNING user_id',
//       [serverId]
//     )

//     const userRolesDel = dbRolesRes.rows.map((r) =>
//       db.dbQuery('DELETE FROM user_roles WHERE role_id = $1', [r.id])
//     )

//     logger.log.info(
//       'Users deleted',
//       dbUserIds.rows.map((u) => u.user_id)
//     )

//     await redis.delServer(
//       serverId,
//       dbUserIds.rows.map((u) => u.user_id)
//     )

//     await Promise.all(userRolesDel)
//     logger.log.info('ServerDeleted', discordName)
//     res.send(204)
//   } catch (err) {
//     logger.log.error(
//       'Error deleting server',
//       { id: discordId, name: discordName },
//       err
//     )
//     res.send(500)
//   }
// })

export default router
