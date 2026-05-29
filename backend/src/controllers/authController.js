// Authentication controller
const User = require('../models/User');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const { generateToken } = require('../utils/jwt');
const { AppError } = require('../middleware/errorHandler');
const {
  validateEmail,
  validatePassword,
  validateRequired,
} = require('../utils/validation');

/**
 * Register a new user (teacher/admin)
 * POST /api/auth/register
 */
const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, role, phone } = req.body;

    // Validation
    if (
      !validateRequired(firstName) ||
      !validateRequired(lastName) ||
      !validateEmail(email) ||
      !validatePassword(password)
    ) {
      throw new AppError('Please provide valid registration details', 400);
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError('Email already registered', 400);
    }

    // Create new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role: role || 'teacher',
      phone,
    });

    // Generate token
    const token = generateToken(user._id, user.role);

    sendSuccess(
      res,
      201,
      {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        token,
      },
      'User registered successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Login user
 * POST /api/auth/login
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!validateEmail(email) || !validatePassword(password)) {
      throw new AppError('Please provide valid email and password', 400);
    }

    // Find user and select password (it's hidden by default)
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    // Check password
    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', 401);
    }

    if (!user.isActive) {
      throw new AppError('Your account has been deactivated', 403);
    }

    // Generate token
    const token = generateToken(user._id, user.role);

    sendSuccess(
      res,
      200,
      {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        token,
      },
      'Login successful'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get current logged-in user
 * GET /api/auth/me
 */
const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    sendSuccess(
      res,
      200,
      {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        phone: user.phone,
        isActive: user.isActive,
      },
      'User retrieved successfully'
    );
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getCurrentUser };
