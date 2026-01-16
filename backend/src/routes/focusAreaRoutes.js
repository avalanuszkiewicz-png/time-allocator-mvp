/**
 * Focus Area Routes
 * ----------------
 * HTTP routes for creating, fetching, and deleting focus areas.
 * Delegates logic to the focus area controller.
 */

import express from 'express';
import {
  createFocusArea,
  getFocusAreas,
  deleteFocusArea
} from '../controllers/focusAreaController.js';

const router = express.Router();

// Create a focus area
router.post('/', createFocusArea);

// Get all focus areas
router.get('/', getFocusAreas);

// Delete a focus area (and its tasks)
router.delete('/:id', deleteFocusArea);

export default router;
