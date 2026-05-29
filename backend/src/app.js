const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import middleware
const loggingMiddleware = require('./middleware/logging');
const { errorHandler } = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const admissionRoutes = require('./routes/admissionRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggingMiddleware);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/admissions', admissionRoutes);
app.use('/api/contact', contactRoutes);

// Home route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Preschool Management System Backend',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      students: '/api/students',
      teachers: '/api/teachers',
      admissions: '/api/admissions',
      contact: '/api/contact',
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
  });
});

// Error handling middleware (should be last)
app.use(errorHandler);

module.exports = app;