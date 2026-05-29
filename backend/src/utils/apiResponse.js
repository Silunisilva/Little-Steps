// Reusable API response structure
class APIResponse {
  constructor(statusCode, data, message, success = true) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = success;
  }
}

/**
 * Send a success response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {any} data - Response data
 * @param {string} message - Response message
 */
const sendSuccess = (res, statusCode, data, message = 'Success') => {
  res.status(statusCode).json(
    new APIResponse(statusCode, data, message, true)
  );
};

/**
 * Send an error response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 */
const sendError = (res, statusCode, message = 'Error') => {
  res.status(statusCode).json(
    new APIResponse(statusCode, null, message, false)
  );
};

module.exports = { APIResponse, sendSuccess, sendError };
