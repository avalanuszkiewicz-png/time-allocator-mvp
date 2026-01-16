/**
 * Calculation Routes
 * ------------------
 * HTTP route for triggering time allocation calculations.
 * Delegates orchestration to the calculation controller.
 */

import express from 'express';
import { calculateTime } from '../controllers/calculateController.js';

const router = express.Router();

router.post('/', calculateTime);

export default router;
