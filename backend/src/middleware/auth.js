// JWT authentication middleware
const { verifyToken } = require('../utils/jwt');
const { AppError } = require('./errorHandler');
const User = require('../models/User');

/**
 * Verify JWT token and attach user to request
 */
const authenticateToken = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
      throw new AppError('No token provided. Please login first', 401);
    }

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      throw new AppError('Invalid or expired token', 401);
    }

    // Get user from database
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (!user.isActive) {
      throw new AppError('User account is inactive', 403);
    }

    // Attach user to request
    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Check if user has required role
 * @param {...string} allowedRoles - Roles that are allowed
 */
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to access this resource', 403)
      );
    }
    next();
  };
};

module.exports = { authenticateToken, authorize };
