import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.info("API Call", {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    timestamp: new Date().toISOString(),
  });
  const originalEnd = res.end;

  res.end = function (
    chunk?: any,
    encoding?: BufferEncoding | (() => void),
    callback?: () => void,
  ) {
    logger.info("API Response", {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      timestamp: new Date().toISOString(),
    });

    return originalEnd.call(this, chunk, encoding as BufferEncoding, callback);
  };

  next();
};

export const errorLogger = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Log the error
  logger.error("Error occurred", {
    error: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    timestamp: new Date().toISOString(),
  });

  // Send error response
  res.status((err as any).status || 500).json({
    error: {
      message: err.message || "Internal Server Error",
      status: (err as any).status || 500,
    },
  });
};
