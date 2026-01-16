/**
 * Server Entry Point
 * ------------------
 * Connects to the database and starts the HTTP server.
 */

import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5050;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
