import { Request, Response, NextFunction } from 'express'

const validator = (req: Request, res: Response, next: NextFunction) => {
  next()
}

export default validator
