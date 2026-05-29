// Teacher controller
const Teacher = require('../models/Teacher');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const { AppError } = require('../middleware/errorHandler');
const { validateRequired, validateEmail } = require('../utils/validation');

/**
 * Get all teachers
 * GET /api/teachers
 */
const getAllTeachers = async (req, res, next) => {
  try {
    const status = req.query.status; // e.g., ?status=active
    const filter = status ? { status } : {};

    const teachers = await Teacher.find(filter).sort({ dateJoined: -1 });

    sendSuccess(
      res,
      200,
      { count: teachers.length, teachers },
      'Teachers retrieved successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get single teacher by ID
 * GET /api/teachers/:id
 */
const getTeacherById = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate(
      'assignedClasses',
      'firstName lastName'
    );

    if (!teacher) {
      throw new AppError('Teacher not found', 404);
    }

    sendSuccess(res, 200, teacher, 'Teacher retrieved successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Add new teacher
 * POST /api/teachers
 */
const addTeacher = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      specialization,
      qualifications,
      address,
      emergencyContact,
    } = req.body;

    // Validation
    if (
      !validateRequired(firstName) ||
      !validateRequired(lastName) ||
      !validateEmail(email)
    ) {
      throw new AppError('Please provide all required fields with valid data', 400);
    }

    // Check if teacher email already exists
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      throw new AppError('Email already registered', 400);
    }

    const teacher = await Teacher.create({
      firstName,
      lastName,
      email,
      phone,
      specialization,
      qualifications,
      address,
      emergencyContact,
    });

    sendSuccess(res, 201, teacher, 'Teacher added successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Update teacher
 * PUT /api/teachers/:id
 */
const updateTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!teacher) {
      throw new AppError('Teacher not found', 404);
    }

    sendSuccess(res, 200, teacher, 'Teacher updated successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Delete teacher
 * DELETE /api/teachers/:id
 */
const deleteTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);

    if (!teacher) {
      throw new AppError('Teacher not found', 404);
    }

    sendSuccess(res, 200, null, 'Teacher deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTeachers,
  getTeacherById,
  addTeacher,
  updateTeacher,
  deleteTeacher,
};
