// Contact form submission model
const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide first name'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Please provide last name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address',
    ],
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number'],
    trim: true,
  },
  subject: {
    type: String,
    required: [true, 'Please provide subject'],
    trim: true,
  },
  message: {
    type: String,
    required: [true, 'Please provide message'],
    trim: true,
  },
  type: {
    type: String,
    enum: ['general', 'complaint', 'feedback', 'inquiry'],
    default: 'general',
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  repliedAt: Date,
  reply: String,
});

module.exports = mongoose.model('Contact', ContactSchema);
