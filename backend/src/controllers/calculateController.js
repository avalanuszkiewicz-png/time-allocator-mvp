/**
 * Calculation Controller
 * ----------------------
 * Orchestrates time allocation by:
 * - validating inputs
 * - fetching responsibilities and focus areas
 * - delegating computation to the service layer
 */

import Responsibility from '../models/Responsibility.js';
import FocusArea from '../models/FocusArea.js';
import { calculateTimeAllocation } from '../services/timeAllocationService.js';

export async function calculateTime(req, res) {
  try {
    const { totalHours } = req.body;

    if (!totalHours || totalHours <= 0) {
      return res.status(400).json({
        message: 'totalHours must be a positive number'
      });
    }

    const responsibilities = await Responsibility.find();
    const focusAreas = await FocusArea.find();

    const allocations = calculateTimeAllocation({
      responsibilities,
      totalHours
    });

    const results = allocations
      .map(allocation => {
        const focusArea = focusAreas.find(
          fa => String(fa._id) === String(allocation.focusAreaId)
        );

        return {
          focusAreaId: allocation.focusAreaId,
          focusAreaName: focusArea?.name || 'Unknown',
          hours: allocation.hours
        };
      })
      .sort((a, b) => b.hours - a.hours);

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
