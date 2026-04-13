/**
 * Calculates the percentage of a goal reached.
 * @param raised - The current amount collected
 * @param goal - The target amount
 * @returns An integer between 0 and 100
 */
export const calculateProgress = (raised: number, goal: number): number => {
  if (goal <= 0) return 0;
  console.log(raised, "Raised")
  console.log(goal, "Goal")
  const percentage = (raised / goal) * 100;
  console.log(percentage, "Percentage")
  
  // Math.min(..., 100) ensures the bar doesn't exceed 100% visually
  // Math.round keeps the UI clean (e.g., "67%" instead of "66.6666%")
  return Math.min(Math.round(percentage), 100);
};