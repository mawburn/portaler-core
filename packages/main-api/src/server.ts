import express, { Request, Response, NextFunction } from 'express'

const app = express()

app.listen(4000, () => {
  console.info('Running on port 4000')
})

// Routes
app.use('/api/discord', require('./module/discord'))

// middlewares should probably be moved eventually
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  switch (err.message) {
    case 'NoCodeProvided':
      return res.status(400).send({
        status: 'ERROR',
        error: err.message,
      })
    default:
      return res.status(500).send({
        status: 'ERROR',
        error: err.message,
      })
  }
})

// validate that they have a token
app.use((req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    // TODO do a token lookup here, to get server and auth info on this user

    if (token) {
      return next()
    }
  } catch {
    // if the user has no token, redirect to login
    res.redirect('/')
    return
  }
  // if the try does not complete, then lets redirect to login
  res.redirect('/')
})
