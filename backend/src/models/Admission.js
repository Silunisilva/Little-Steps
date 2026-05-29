// Admission request model
const mongoose = require('mongoose');

const AdmissionSchema = new mongoose.Schema({
  childFirstName: {
    type: String,
    required: [true, 'Please provide child first name'],
    trim: true,
  },
  childLastName: {
    type: String,
    required: [true, 'Please provide child last name'],
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Please provide date of birth'],
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: [true, 'Please specify gender'],
  },
  program: {
    type: String,
    enum: ['nursery', 'pre-k', 'kindergarten'],
    required: [true, 'Please select program'],
  },
  parentFirstName: {
    type: String,
    required: [true, 'Please provide parent first name'],
    trim: true,
  },
  parentLastName: {
    type: String,
    required: [true, 'Please provide parent last name'],
    trim: true,
  },
  parentEmail: {
    type: String,
    required: [true, 'Please provide parent email'],
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address',
    ],
  },
  parentPhone: {
    type: String,
    required: [true, 'Please provide parent phone'],
    trim: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
  message: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  reviewedAt: Date,
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Admission', AdmissionSchema);
