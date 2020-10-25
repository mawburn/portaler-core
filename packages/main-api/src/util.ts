import { Request, Response, NextFunction } from 'express';

// async/await error catcher
const catchAsyncErrors = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => (req: Request, res: Response, next: NextFunction) => {
  const routePromise = fn(req, res, next);
  if (routePromise.catch) {
    routePromise.catch((err: Error) => next(err));
  }
};

export default catchAsyncErrors;
