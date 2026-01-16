/**
 * Focus Area Controller
 * --------------------
 * Handles creation, retrieval, and deletion of focus areas.
 * Keeps logic minimal and explicit.
 */

import FocusArea from '../models/FocusArea.js';
import Responsibility from '../models/Responsibility.js';

export async function createFocusArea(req, res) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const focusArea = await FocusArea.create({ name });
    res.status(201).json(focusArea);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getFocusAreas(req, res) {
  try {
    const focusAreas = await FocusArea.find().sort({ createdAt: 1 });
    res.json(focusAreas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function deleteFocusArea(req, res) {
  try {
    const { id } = req.params;

    // Delete the focus area
    await FocusArea.findByIdAndDelete(id);

    // Delete all responsibilities under this focus area
    await Responsibility.deleteMany({ focusAreaId: id });

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
