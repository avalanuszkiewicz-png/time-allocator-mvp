/**
 * FocusArea Model
 * ----------------
 * Represents a high-level area of responsibility
 * (e.g. company, role, initiative, personal domain).
 * Acts purely as a container for responsibilities.
 */

import mongoose from 'mongoose';

const FocusAreaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('FocusArea', FocusAreaSchema);
