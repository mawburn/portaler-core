import { NextFunction, Request, Response } from 'express'
import logger from '../utils/logger'

const syntaxError = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof SyntaxError) {
    logger.error({ message: 'Syntax Error', error })
    return res.status(500).json({ error: 'SyntaxError' })
  } else {
    next()
  }
}

export default syntaxError
