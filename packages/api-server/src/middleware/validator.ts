import { Request, Response, NextFunction } from 'express'
import logger from '../utils/logger'

const validator = (req: Request, res: Response, next: NextFunction) => {
  try {
    const headers = Object.keys(req.headers).map((k) => k.toLowerCase())

    if (!headers.includes('user-agent') || !headers.includes('referer')) {
      logger.debug('No Data', {
        headers: JSON.parse(JSON.stringify(req.headers)),
      })

      res.status(200).send({})
    }

    next()
  } catch (err) {
    logger.debug('Validator', { error: err })
    res.status(200).send({})
  }
}

export default validator
