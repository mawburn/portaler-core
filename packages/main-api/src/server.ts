import express, {Express, Request, Response, NextFunction} from 'express';

const setupServer = (): Express => {
  const app = express();

  // middlewares should probably be moved eventually
  //TODO type err
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    switch (err.message) {
      case 'NoCodeProvided':
        return res.status(400).send({
          status: 'ERROR',
          error: err.message,
        });
      default:
        return res.status(500).send({
          status: 'ERROR',
          error: err.message,
        });
    }
  });

  // validate that they have a token
  app.use((req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (token) {
      const part = token.split(' ')[1];
      // TODO do a token lookup here, to get server and auth info on this user
      return next();
    }

    res.redirect('/');
  });

  app.listen(4000, () => {
    console.info('Running on port 4000');
  });

  return app;
};

export default setupServer;