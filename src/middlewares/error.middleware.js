import logger from "../config/logger.config.js";

export const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  logger.error(statusCode,message);

  return res.status(statusCode).json({
    success: false,
    message: message,
  });
};
