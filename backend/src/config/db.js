// MongoDB connection configuration
const mongoose = require('mongoose');

/**
 * Connect to MongoDB database
 * @returns {Promise} Returns a promise that resolves when connected
 */
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    // Mongoose 6+ enables the new parser and unified topology by default.
    // Passing legacy options may cause errors in newer versions, so omit them.
    // Temporary: Allow self-signed certs for TLS debugging (remove after verification)
    await mongoose.connect(mongoURI, {
      tlsAllowInvalidCertificates: true,
    });

    console.log('✅ MongoDB connected successfully');
    return mongoose.connection;
  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error(error);
    if (error.stack) console.error(error.stack);
    // Exit process after logging full error for debugging
    process.exit(1);
  }
};

module.exports = connectDB;
