import { Request, Response, NextFunction } from 'express'
import logger from '../utils/logger'

const validator = (req: Request, res: Response, next: NextFunction) => {
  const headers = Object.keys(req.headers).map((k) => k.toLowerCase())

  if (!headers.includes('user-agent') || !headers.includes('referer')) {
    logger.warn({
      message: 'No Data',
      headers: JSON.parse(JSON.stringify(req.headers)),
    })

    res.status(200).send({})
  }

  next()
}

export default validator
