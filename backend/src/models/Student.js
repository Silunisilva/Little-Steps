// Student model
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide student first name'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Please provide student last name'],
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
  parentName: {
    type: String,
    required: [true, 'Please provide parent name'],
    trim: true,
  },
  parentEmail: {
    type: String,
    required: [true, 'Please provide parent email'],
    lowercase: true,
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
  enrollmentDate: {
    type: Date,
    default: Date.now,
  },
  program: {
    type: String,
    enum: ['nursery', 'pre-k', 'kindergarten'],
    default: 'nursery',
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'graduated'],
    default: 'active',
  },
  emergencyContact: {
    name: String,
    phone: String,
  },
  medicalInfo: {
    allergies: String,
    specialNeeds: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Student', StudentSchema);
