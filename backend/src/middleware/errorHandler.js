// Centralized error handling middleware
const { sendError } = require('../utils/apiResponse');

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

/**
 * Error handling middleware
 * This should be the last middleware in your app
 */
const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  // Log error details (in production, use a proper logging service)
  console.error('[ERROR]', {
    status: err.statusCode,
    message: err.message,
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
  });

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
    return sendError(res, 400, message);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `${field} already exists`;
    return sendError(res, 400, message);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return sendError(res, 401, 'Invalid token');
  }

  if (err.name === 'TokenExpiredError') {
    return sendError(res, 401, 'Token expired');
  }

  // Custom AppError
  if (err instanceof AppError) {
    return sendError(res, err.statusCode, err.message);
  }

  sendError(res, err.statusCode, err.message);
};

module.exports = { errorHandler, AppError };
