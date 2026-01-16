/**
 * Time Allocation Service
 * ----------------------
 * Core business logic for converting responsibilities
 * into proportional time allocations across focus areas.
 * Pure, deterministic, and reusable.
 *
 * Scoring logic:
 * - Impact drives value (weighted highest)
 * - Priority drives urgency
 * - Difficulty reduces effective score (cognitive/operational cost)
 */

export function calculateTimeAllocation({
  responsibilities,
  totalHours
}) {
  const focusAreaScores = {};

  responsibilities.forEach(r => {
    // Calculate task score
    const rawScore =
      r.impact * 3 +
      r.priority * 2 -
      r.difficulty;

    // Prevent negative or zero contribution
    const score = Math.max(rawScore, 0);

    const focusAreaId = r.focusAreaId.toString();

    focusAreaScores[focusAreaId] =
      (focusAreaScores[focusAreaId] || 0) + score;
  });

  const totalScore = Object.values(focusAreaScores)
    .reduce((sum, val) => sum + val, 0);

  return Object.entries(focusAreaScores).map(
    ([focusAreaId, score]) => ({
      focusAreaId,
      hours:
        totalScore === 0
          ? 0
          : +(score / totalScore * totalHours).toFixed(2)
    })
  );
}
