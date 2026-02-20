const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const env = require('./config/env');
const connectDB = require('./config/db');

// Load environment variables
require('dotenv').config();

const app = express();

// CORS Configuration
app.use(cors(env.corsOptions));
app.use(express.json());

// Import the routes
const inquiryRoutes = require('./routes/inquiryRoutes');
app.use(`${env.api.prefix}/inquiries`, inquiryRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    environment: env.nodeEnv 
  });
});

// Connect to MongoDB
connectDB();

// Start server
app.listen(env.port, () => {
  console.log(`🚀 Server running on port ${env.port} in ${env.nodeEnv} mode`);
});
