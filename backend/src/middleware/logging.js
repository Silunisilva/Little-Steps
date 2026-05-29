// Logging middleware
const loggingMiddleware = (req, res, next) => {
  // Log incoming request
  const startTime = Date.now();

  // Log when response is sent
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const logMessage = `[${new Date().toISOString()}] ${req.method} ${
      req.originalUrl
    } - Status: ${res.statusCode} - Duration: ${duration}ms`;

    // Color code by status
    if (res.statusCode >= 400) {
      console.error(logMessage);
    } else {
      console.log(logMessage);
    }
  });

  next();
};

module.exports = loggingMiddleware;
