// Admission controller
const Admission = require('../models/Admission');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const { AppError } = require('../middleware/errorHandler');
const { validateRequired, validateEmail } = require('../utils/validation');

/**
 * Get all admission requests
 * GET /api/admissions
 */
const getAllAdmissions = async (req, res, next) => {
  try {
    const status = req.query.status; // e.g., ?status=pending
    const filter = status ? { status } : {};

    const admissions = await Admission.find(filter)
      .populate('reviewedBy', 'firstName lastName email')
      .sort({ submittedAt: -1 });

    sendSuccess(
      res,
      200,
      { count: admissions.length, admissions },
      'Admissions retrieved successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get single admission request
 * GET /api/admissions/:id
 */
const getAdmissionById = async (req, res, next) => {
  try {
    const admission = await Admission.findById(req.params.id).populate(
      'reviewedBy',
      'firstName lastName email'
    );

    if (!admission) {
      throw new AppError('Admission request not found', 404);
    }

    sendSuccess(res, 200, admission, 'Admission retrieved successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Submit admission request
 * POST /api/admissions
 */
const submitAdmission = async (req, res, next) => {
  try {
    const {
      childFirstName,
      childLastName,
      dateOfBirth,
      gender,
      program,
      parentFirstName,
      parentLastName,
      parentEmail,
      parentPhone,
      address,
      message,
    } = req.body;

    // Validation
    if (
      !validateRequired(childFirstName) ||
      !validateRequired(childLastName) ||
      !validateRequired(program) ||
      !validateEmail(parentEmail)
    ) {
      throw new AppError('Please provide all required fields with valid data', 400);
    }

    const admission = await Admission.create({
      childFirstName,
      childLastName,
      dateOfBirth,
      gender,
      program,
      parentFirstName,
      parentLastName,
      parentEmail,
      parentPhone,
      address,
      message,
    });

    sendSuccess(res, 201, admission, 'Admission request submitted successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Update admission status (only admin)
 * PUT /api/admissions/:id
 */
const updateAdmission = async (req, res, next) => {
  try {
    const { status, reply } = req.body;

    const admission = await Admission.findByIdAndUpdate(
      req.params.id,
      {
        status,
        reviewedAt: new Date(),
        reviewedBy: req.user._id,
      },
      { new: true, runValidators: true }
    ).populate('reviewedBy', 'firstName lastName email');

    if (!admission) {
      throw new AppError('Admission request not found', 404);
    }

    sendSuccess(res, 200, admission, 'Admission updated successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAdmissions,
  getAdmissionById,
  submitAdmission,
  updateAdmission,
};
