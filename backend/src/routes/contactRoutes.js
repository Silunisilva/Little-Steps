// Contact routes
const express = require('express');
const {
  submitContactForm,
  getAllContacts,
  getContactById,
  replyToContact,
  deleteContact,
} = require('../controllers/contactController');
const { authenticateToken, authorize } = require('../middleware/auth');

const router = express.Router();

// Public route - anyone can submit contact form
router.post('/', submitContactForm);

// Protected routes - admin only
router.use(authenticateToken, authorize('admin'));

router.get('/', getAllContacts);
router.get('/:id', getContactById);
router.put('/:id', replyToContact);
router.delete('/:id', deleteContact);

module.exports = router;
