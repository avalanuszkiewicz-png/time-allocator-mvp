/**
 * Responsibility Controller
 * -------------------------
 * Handles creation, retrieval, and deletion of tasks.
 * Each task includes impact, priority, and difficulty metrics (1–5).
 */

import Responsibility from '../models/Responsibility.js';

export async function createResponsibility(req, res) {
  try {
    const {
      focusAreaId,
      title,
      impact,
      priority,
      difficulty
    } = req.body;

    if (
      !focusAreaId ||
      !title ||
      !impact ||
      !priority ||
      !difficulty
    ) {
      return res.status(400).json({
        message:
          'focusAreaId, title, impact, priority, and difficulty are required'
      });
    }

    const responsibility = await Responsibility.create({
      focusAreaId,
      title,
      impact,
      priority,
      difficulty
    });

    res.status(201).json(responsibility);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getResponsibilities(req, res) {
  try {
    const responsibilities = await Responsibility.find()
      .populate('focusAreaId', 'name')
      .sort({ createdAt: 1 });

    res.json(responsibilities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function deleteResponsibility(req, res) {
  try {
    const { id } = req.params;

    await Responsibility.findByIdAndDelete(id);

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
