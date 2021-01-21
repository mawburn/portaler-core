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

export default router
