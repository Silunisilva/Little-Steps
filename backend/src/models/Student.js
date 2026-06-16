// Student model
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please Provide Your First Name'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Please Provide Your Last Name'],
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Please Provide Your Date Of Birth'],
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: [true, 'Please Specify Your Gender'],
  },
  parentName: {
    type: String,
    required: [true, 'Please Provide Your Parent Name'],
    trim: true,
  },
  parentEmail: {
    type: String,
    required: [true, 'Please Provide Your Parent Email'],
    lowercase: true,
  },
  parentPhone: {
    type: String,
    required: [true, 'Please Provide Your Parent Phone Number'],
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
