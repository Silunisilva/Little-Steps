// Admission routes
const express = require('express');
const {
  getAllAdmissions,
  getAdmissionById,
  submitAdmission,
  updateAdmission,
} = require('../controllers/admissionController');
const { authenticateToken, authorize } = require('../middleware/auth');

const router = express.Router();

// Public route - anyone can submit admission
router.post('/', submitAdmission);

// Protected routes - require authentication
router.use(authenticateToken);

// Get all admissions (admin only)
router.get('/', authorize('admin'), getAllAdmissions);

// Get single admission (admin only)
router.get('/:id', authorize('admin'), getAdmissionById);

// Update admission status (admin only)
router.put('/:id', authorize('admin'), updateAdmission);

module.exports = router;
