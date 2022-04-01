import { Router } from 'express'

import { emailIsValid } from '@portaler/utils'

import { db } from '../utils/db'

const router = Router()

const alphaTest = new RegExp(/^[a-z0-9]+$/gi)

const validatePath = async (path: string): Promise<boolean> => {
  if (!alphaTest.test(path)) {
    return false
  }

  const id = await db.Server.getServerIdBySubdomain(path.toLowerCase())

  const signupRows = await db.dbQuery(
    `SELECT id FROM server_signup WHERE path = $1`,
    [path.toLowerCase()]
  )

  // the server shouldn't exist
  return id === null && signupRows.rowCount === 0
}

router.get('/domainCheck/:domain', async (req, res) => {
  const status = (await validatePath(req.params.domain)) ? 204 : 409

  return res.sendStatus(status)
})

router.post('/', async (req, res) => {
  const { path, discord, estimatedUsers, email } = req.body

  const errors = []

  // validate
  if (!path || !(await validatePath(path))) {
    errors.push('Invalid Path')
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
