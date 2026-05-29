// Validation utilities
const validateEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  // Basic phone validation - at least 10 digits
  const phoneRegex = /^\d{10,}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

const validatePassword = (password) => {
  // Password should be at least 6 characters
  return password && password.length >= 6;
};

const validateRequired = (value) => {
  return value && value.toString().trim() !== '';
};

module.exports = {
  validateEmail,
  validatePhone,
  validatePassword,
  validateRequired,
};
