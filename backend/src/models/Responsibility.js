/**
 * Responsibility Model
 * --------------------
 * Represents a specific responsibility within a focus area.
 * Contains all decision-driving metrics used for time allocation.
 */

import mongoose from 'mongoose';

const ResponsibilitySchema = new mongoose.Schema(
  {
    focusAreaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FocusArea',
      required: true
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    impact: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },

    priority: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },

 difficulty: {
  type: Number,
  min: 1,
  max: 5,
  required: true
}

  },
  { timestamps: true }
);

export default mongoose.model('Responsibility', ResponsibilitySchema);
