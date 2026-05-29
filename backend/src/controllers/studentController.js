// Student controller
const Student = require('../models/Student');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const { AppError } = require('../middleware/errorHandler');
const { validateRequired, validateEmail } = require('../utils/validation');

/**
 * Get all students
 * GET /api/students
 */
const getAllStudents = async (req, res, next) => {
  try {
    // Add optional filtering
    const status = req.query.status; // e.g., ?status=active
    const filter = status ? { status } : {};

    const students = await Student.find(filter).sort({ createdAt: -1 });

    sendSuccess(
      res,
      200,
      { count: students.length, students },
      'Students retrieved successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get single student by ID
 * GET /api/students/:id
 */
const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      throw new AppError('Student not found', 404);
    }

    sendSuccess(res, 200, student, 'Student retrieved successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Add new student
 * POST /api/students
 */
const addStudent = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      parentName,
      parentEmail,
      parentPhone,
      address,
      program,
      emergencyContact,
      medicalInfo,
    } = req.body;

    // Validation
    if (
      !validateRequired(firstName) ||
      !validateRequired(lastName) ||
      !validateRequired(parentName) ||
      !validateEmail(parentEmail)
    ) {
      throw new AppError('Please provide all required fields with valid data', 400);
    }

    const student = await Student.create({
      firstName,
      lastName,
      dateOfBirth,
      gender,
      parentName,
      parentEmail,
      parentPhone,
      address,
      program,
      emergencyContact,
      medicalInfo,
    });

    sendSuccess(res, 201, student, 'Student added successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Update student
 * PUT /api/students/:id
 */
const updateStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!student) {
      throw new AppError('Student not found', 404);
    }

    sendSuccess(res, 200, student, 'Student updated successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Delete student
 * DELETE /api/students/:id
 */
const deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      throw new AppError('Student not found', 404);
    }

    sendSuccess(res, 200, null, 'Student deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
};
