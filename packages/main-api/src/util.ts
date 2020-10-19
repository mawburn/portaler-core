import { NextFunction, Request, Response } from "express";

// async/await error catcher
export const catchAsyncErrors = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => (req: Request, res: Response, next: NextFunction): Promise<any> => {
  return fn(req, res, next).catch(err => next(err));
};

