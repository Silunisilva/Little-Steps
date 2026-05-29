// Teacher routes
const express = require('express');
const {
  getAllTeachers,
  getTeacherById,
  addTeacher,
  updateTeacher,
  deleteTeacher,
} = require('../controllers/teacherController');
const { authenticateToken, authorize } = require('../middleware/auth');

const router = express.Router();

// Protect all routes - require authentication
router.use(authenticateToken);

// Public for authenticated users
router.get('/', getAllTeachers);
router.get('/:id', getTeacherById);

// Only admin can add, update, delete
router.post('/', authorize('admin'), addTeacher);
router.put('/:id', authorize('admin'), updateTeacher);
router.delete('/:id', authorize('admin'), deleteTeacher);

module.exports = router;
