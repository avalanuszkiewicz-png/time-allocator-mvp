/**
 * Database Configuration
 * ----------------------
 * Establishes a connection to MongoDB using Mongoose.
 * Fails fast on connection errors.
 */

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI; // ✅ correct name

    if (!uri) {
      throw new Error('MONGODB_URI is not defined');
    }

    console.log('🔌 Connecting to MongoDB...');

    const conn = await mongoose.connect(uri, {
      autoIndex: true,
      authSource: 'admin', // ✅ critical
    });

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;
