/**
 * Responsibility Routes
 * ---------------------
 * HTTP routes for creating, fetching, and deleting tasks.
 * Delegates logic to the responsibility controller.
 */

import express from 'express';
import {
  createResponsibility,
  getResponsibilities,
  deleteResponsibility
} from '../controllers/responsibilityController.js';

const router = express.Router();

// Create a task
router.post('/', createResponsibility);

// Get all tasks
router.get('/', getResponsibilities);

// Delete a task
router.delete('/:id', deleteResponsibility);

export default router;
