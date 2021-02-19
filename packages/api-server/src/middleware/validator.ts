import { Request, Response, NextFunction } from 'express'
import logger from '../utils/logger'

const validator = (req: Request, res: Response, next: NextFunction) => {
  logger.info('User Agent', { ua: req.headers['user-agent'] })

  next()
}

export default validator
