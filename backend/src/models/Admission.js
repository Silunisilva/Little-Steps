// Admission request model
const mongoose = require('mongoose');

const AdmissionSchema = new mongoose.Schema({
  childFirstName: {
    type: String,
    required: [true, 'Please provide your child first name'],
    trim: true,
  },
  childLastName: {
    type: String,
    required: [true, 'Please provide your child last name'],
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Please provide your child\'s date of birth'],
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: [true, 'Please specify your child\'s gender'],
  },
  program: {
    type: String,
    enum: ['nursery', 'pre-k', 'kindergarten'],
    required: [true, 'Please select program'],
  },
  parentFirstName: {
    type: String,
    required: [true, 'Please provide your parent first name'],
    trim: true,
  },
  parentLastName: {
    type: String,
    required: [true, 'Please provide your parent last name'],
    trim: true,
  },
  parentEmail: {
    type: String,
    required: [true, 'Please provide your parent email'],
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address',
    ],
  },
  parentPhone: {
    type: String,
    required: [true, 'Please provide your parent phone'],
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
