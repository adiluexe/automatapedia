export interface EuclideanStep {
  a: number;
  b: number;
  quotient: number;
  remainder: number;
}

export const executeEuclideanAlgorithm = (
  a: number,
  b: number
): EuclideanStep[] => {
  if (a <= 0 || b <= 0) {
    return [];
  }

  const steps: EuclideanStep[] = [];
  let currentA = Math.max(a, b); // Ensure a is always greater or equal to b initially
  let currentB = Math.min(a, b);

  while (currentB !== 0) {
    const quotient = Math.floor(currentA / currentB);
    const remainder = currentA % currentB;
    steps.push({ a: currentA, b: currentB, quotient, remainder });
    currentA = currentB;
    currentB = remainder;
  }
  // Add the last step where remainder is 0, showing the GCD
  steps.push({ a: currentA, b: currentB, quotient: 0, remainder: 0 });
  return steps;
};
