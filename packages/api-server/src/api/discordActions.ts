import { Router } from 'express'

import config from '../utils/config'
import { db, redis } from '../utils/db'
import logger from '../utils/logger'

const router = Router()

const alphaTest = new RegExp(/^[a-z0-9]+$/gi)

router.get('/serverRoles', async (req, res) => {
  const rolesRows = await db.dbQuery(`SELECT sr.discord_role_id as id
  FROM server_roles sr 
  JOIN servers s ON s.id = sr.server_id
  WHERE s.subdomain IS NULL`)

  return res.status(200).send(rolesRows.rows.map((r) => r.id))
})

router.post('/addServer', async (req, res) => {
  try {
    const body = req.body

    if (
      !body.discordId ||
      typeof body.subdomain !== 'string' ||
      alphaTest.test(body.subdomain)
    ) {
      throw new Error('BadPayload')
    }

    // configure your own DNS service
    if (config.dns) {
      const dnsOk = await fetch(config.dns, {
        method: 'POST',
        body: JSON.stringify({ subdomain: body.subdomain.toLowerCase() }),
      }).then((res) => res.ok)

      if (!dnsOk) {
        throw new Error('DNS Config Error')
      }
    }

    const signupRows = await db.dbQuery(
      `SELECT id FROM server_signup WHERE subdomain = $1 AND generated_key = $2`,
      [body.subdomain.toLowerCase(), body.key]
    )

    if (signupRows.rowCount === 0) {
      return res.status(400).send({ error: 'Server not found' })
    }

    const signupId = signupRows.rows[0].id

    await Promise.all([
      db.dbQuery(`UPDATE servers SET subdomain = $1 WHERE discord_id = $4`, [
        body.subdomain.toLowerCase(),
        body.discordId,
      ]),
      db.dbQuery(`UPDATE server_signup SET discord_id = $1 WHERE id = $2`, [
        body.discordId,
        signupId,
      ]),
    ])

    const server = await db.Server.getServer(body.id)

    if (server && server.subdomain) {
      await redis.setAsync(
        `server:${server.id}`,
        server.subdomain.toLowerCase()
      )
      await redis.setAsync(
        `server:${server.subdomain.toLowerCase()}`,
        JSON.stringify({
          isPublic: server.isPublic,
          serverId: server.id,
          discordUrl: server.discordUrl,
        })
      )
    }

    return res.sendStatus(204)
  } catch (err) {
    logger.log.error('Error in Discord action', err)
    return res.sendStatus(500)
  }
})

export default router
