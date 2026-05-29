// Student routes
const express = require('express');
const {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');
const { authenticateToken, authorize } = require('../middleware/auth');

const router = express.Router();

// Protect all routes - require authentication
router.use(authenticateToken);

// Public for authenticated users
router.get('/', getAllStudents);
router.get('/:id', getStudentById);

// Only admin can add, update, delete
router.post('/', authorize('admin'), addStudent);
router.put('/:id', authorize('admin'), updateStudent);
router.delete('/:id', authorize('admin'), deleteStudent);

module.exports = router;
