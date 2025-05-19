export const generateFibonacciSequence = (
  count: number,
  a?: number, // Make 'a' optional
  b?: number // Make 'b' optional
): number[] => {
  const startA = a === undefined ? 0 : a;
  const startB = b === undefined ? (startA === 0 ? 1 : startA) : b; // Default b based on a if not provided

  if (count <= 0) return [];
  if (count === 1) return [startA];

  const sequence = [startA, startB];
  for (let i = 2; i < count; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2]);
  }
  return sequence.slice(0, count); // Ensure correct length
};
