import { Request, Response, NextFunction } from 'express'
import logger from '../utils/logger'

const validator = (req: Request, res: Response, next: NextFunction) => {
  try {
    next()
  } catch (err) {
    logger.debug('Validator', { error: err })
    res.status(200).send({})
  }
}

export default validator
