import { NextFunction, Request, Response } from 'express'

const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(403)
  }

  const token = req.headers.authorization.split(' ')[1]

  if (token !== process.env.ADMIN_KEY) {
    return res.status(403)
  }

  next()
}

export default checkAdmin
