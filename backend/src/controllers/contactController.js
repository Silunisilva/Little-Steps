// Contact controller
const Contact = require('../models/Contact');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const { AppError } = require('../middleware/errorHandler');
const { validateRequired, validateEmail } = require('../utils/validation');

/**
 * Submit contact form
 * POST /api/contact
 */
const submitContactForm = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, subject, message, type } =
      req.body;

    // Validation
    if (
      !validateRequired(firstName) ||
      !validateRequired(lastName) ||
      !validateEmail(email) ||
      !validateRequired(subject) ||
      !validateRequired(message)
    ) {
      throw new AppError('Please provide all required fields with valid data', 400);
    }

    const contact = await Contact.create({
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
      type: type || 'general',
    });

    sendSuccess(
      res,
      201,
      contact,
      'Contact form submitted successfully. We will get back to you soon!'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get all contact submissions (admin only)
 * GET /api/contact
 */
const getAllContacts = async (req, res, next) => {
  try {
    const isRead = req.query.isRead; // e.g., ?isRead=false
    const filter = isRead !== undefined ? { isRead: isRead === 'true' } : {};

    const contacts = await Contact.find(filter).sort({ submittedAt: -1 });

    sendSuccess(
      res,
      200,
      { count: contacts.length, contacts },
      'Contact submissions retrieved successfully'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get single contact submission
 * GET /api/contact/:id
 */
const getContactById = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      throw new AppError('Contact submission not found', 404);
    }

    // Mark as read
    contact.isRead = true;
    await contact.save();

    sendSuccess(res, 200, contact, 'Contact retrieved successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Reply to contact message (admin only)
 * PUT /api/contact/:id
 */
const replyToContact = async (req, res, next) => {
  try {
    const { reply } = req.body;

    if (!validateRequired(reply)) {
      throw new AppError('Please provide a reply message', 400);
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        reply,
        repliedAt: new Date(),
        isRead: true,
      },
      { new: true }
    );

    if (!contact) {
      throw new AppError('Contact submission not found', 404);
    }

    sendSuccess(res, 200, contact, 'Reply sent successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Delete contact submission
 * DELETE /api/contact/:id
 */
const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      throw new AppError('Contact submission not found', 404);
    }

    sendSuccess(res, 200, null, 'Contact submission deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitContactForm,
  getAllContacts,
  getContactById,
  replyToContact,
  deleteContact,
};
