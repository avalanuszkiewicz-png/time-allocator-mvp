/**
 * Express App Configuration
 * -------------------------
 * Sets up middleware and mounts API routes.
 */

import express from 'express';
import cors from 'cors';

import focusAreaRoutes from './routes/focusAreaRoutes.js';
import responsibilityRoutes from './routes/responsibilityRoutes.js';
import calculateRoutes from './routes/calculateRoutes.js';

const app = express();

// ✅ TEMP: allow everything to verify
app.use(cors());

app.use(express.json());

app.use('/api/focus-areas', focusAreaRoutes);
app.use('/api/responsibilities', responsibilityRoutes);
app.use('/api/calculate', calculateRoutes);

export default app;
