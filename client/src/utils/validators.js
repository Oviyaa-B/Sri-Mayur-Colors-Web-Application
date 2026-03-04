/**
 * Utility Functions
 * Validation and helper functions
 */

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (international format)
const PHONE_REGEX = /^\+?[\d\s-()]{10,}$/;

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid
 */
export const isValidEmail = (email) => {
  if (!email) return false;
  return EMAIL_REGEX.test(email);
};

/**
 * Validate phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid
 */
export const isValidPhone = (phone) => {
  if (!phone) return false;
  return PHONE_REGEX.test(phone);
};

/**
 * Validate required field
 * @param {any} value - Value to check
 * @returns {boolean} - True if not empty
 */
export const isRequired = (value) => {
  if (typeof value === 'string') return value.trim().length > 0;
  if (typeof value === 'number') return true;
  return value !== null && value !== undefined;
};

/**
 * Validate minimum length
 * @param {string} value - Value to check
 * @param {number} min - Minimum length
 * @returns {boolean} - True if valid
 */
export const hasMinLength = (value, min) => {
  if (!value) return false;
  return value.toString().length >= min;
};

/**
 * Validate quantity is within range
 * @param {number} value - Quantity value
 * @param {number} min - Minimum quantity
 * @param {number} max - Maximum quantity
 * @returns {boolean} - True if valid
 */
export const isValidQuantity = (value, min = 1, max = 1000000) => {
  const num = parseInt(value, 10);
  return !isNaN(num) && num >= min && num <= max;
};

/**
 * Validate inquiry form
 * @param {Object} formData - Form data to validate
 * @returns {Object} - Errors object
 */
export const validateInquiryForm = (formData) => {
  const errors = {};

  if (!isRequired(formData.companyName)) {
    errors.companyName = 'Company name is required';
  } else if (!hasMinLength(formData.companyName, 2)) {
    errors.companyName = 'Company name must be at least 2 characters';
  }

  if (!isRequired(formData.country)) {
    errors.country = 'Country is required';
  }

  if (!isRequired(formData.fabricType)) {
    errors.fabricType = 'Fabric type is required';
  }

  if (!isValidQuantity(formData.quantity)) {
    errors.quantity = 'Please enter a valid quantity (min: 1 kg)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @returns {string} - Formatted date
 */
export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} - Formatted number
 */
export const formatNumber = (num) => {
  if (!num) return '0';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Generate unique ID
 * @returns {string} - Unique ID
 */
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export default {
  isValidEmail,
  isValidPhone,
  isRequired,
  hasMinLength,
  isValidQuantity,
  validateInquiryForm,
  formatDate,
  formatNumber,
  generateId,
  debounce,
};

