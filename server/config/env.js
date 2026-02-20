/**
 * Server Environment Configuration
 * Centralized environment variable management
 */

require('dotenv').config();

module.exports = {
  // Server Configuration
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',

  // MongoDB Configuration
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/sri-mayur-colors',
  
  // CORS Configuration
  corsOptions: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  },

  // API Configuration
  api: {
    prefix: '/api',
    version: 'v1'
  },

  // Logging
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production'
};

