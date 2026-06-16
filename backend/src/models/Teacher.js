// Teacher model
const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
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
  email: {
    type: String,
    required: [true, 'Please Provide Your Email'],
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, 'Please Provide Your Phone Number'],
    trim: true,
  },
  specialization: {
    type: String,
    enum: ['general', 'special-ed', 'music', 'arts', 'pe'],
    default: 'general',
  },
  qualifications: [String], // Array of qualifications/certifications
  dateJoined: {
    type: Date,
    default: Date.now,
  },
  assignedClasses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
    },
  ],
  status: {
    type: String,
    enum: ['active', 'inactive', 'on-leave'],
    default: 'active',
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String,
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

module.exports = mongoose.model('Teacher', TeacherSchema);
