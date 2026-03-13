import type { Request, Response, NextFunction } from 'express';

// Global error handling middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    return next(err);
  }

  const status = (err as any).status || 500;

  return res.status(status).json({
    success: false,
    message: err.message || 'Internal server error',
  });
};

