import { Request, Response, NextFunction } from 'express'
import logger from '../utils/logger'

const validator = (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.debug('UA', {
      ua: req.headers['user-agent'] || null,
      referer: req.headers.referer || null,
      body: req.body,
    })

    next()
  } catch (err) {
    logger.debug('Validator', { error: err })
    res.status(200).send({})
  }
}

export default validator
