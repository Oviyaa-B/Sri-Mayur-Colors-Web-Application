const mongoose = require('mongoose');
require('dotenv').config();

const mongoUri = process.env.MONGO_URI;
console.log('Testing connection to:', mongoUri.replace(/:[^:]*@/, ':****@'));

mongoose.connect(mongoUri)
  .then(() => {
    console.log('✅ Connection successful!');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('❌ Connection failed:', err.message);
  });
