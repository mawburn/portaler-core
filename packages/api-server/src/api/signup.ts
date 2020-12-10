import { Router } from 'express'

import { emailIsValid } from '@portaler/utils'

import { db } from '../utils/db'

const router = Router()

const alphaTest = new RegExp(/^[a-z0-9]+$/gi)

const validateSubdomain = async (subdomain: string): Promise<boolean> => {
  if (!alphaTest.test(subdomain)) {
    return false
  }

  const id = await db.Server.getServerIdBySubdomain(subdomain.toLowerCase())

  const signupRows = await db.dbQuery(
    `SELECT id FROM server_signup WHERE subdomain = $1`,
    [subdomain.toLowerCase()]
  )

  // the server shouldn't exist
  return id === null && signupRows.rowCount === 0
}

router.get('/domainCheck/:domain', async (req, res) => {
  const status = (await validateSubdomain(req.params.domain)) ? 204 : 409

  return res.sendStatus(status)
})

router.post('/', async (req, res) => {
  const { subdomain, discord, estimatedUsers, email } = req.body

  const errors = []

  // validate
  if (!subdomain || !(await validateSubdomain(subdomain))) {
    errors.push('Invalid Subdomain')
  }

  if (!discord) {
    errors.push('Invalid Discord')
  }

  if (!email || !emailIsValid(email)) {
    errors.push('Invalid Email')
  }

  if (errors.length > 0) {
    return res.status(400).send({ errors })
  }
})

export default router
