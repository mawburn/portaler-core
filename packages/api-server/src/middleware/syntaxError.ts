import { NextFunction, Request, Response } from 'express'

const syntaxError = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof SyntaxError) {
    return res.status(500).json({ error: 'SyntaxError' })
  } else {
    next()
  }
}

export default syntaxError
