require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/db');

// Connect to DB
connectDB();

const seedUsers = async () => {
  try {
    await User.deleteMany({}); // Warning: Only for dev config

    await User.create([
      {
        email: 'admin@srimayur.com',
        password: 'password123',
        role: 'admin',
      },
      {
        email: 'user@srimayur.com',
        password: 'password123',
        role: 'user',
      },
    ]);

    console.log('Test users seeded:');
    console.log('1. Admin: admin@srimayur.com / password123');
    console.log('2. User: user@srimayur.com / password123');
    process.exit();
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();
