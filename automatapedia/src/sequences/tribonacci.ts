export const generateTribonacciSequence = (
  count: number,
  a?: number, // Make 'a' optional
  b?: number, // Make 'b' optional
  c?: number // Make 'c' optional
): number[] => {
  const startA = a === undefined ? 0 : a;
  const startB = b === undefined ? (startA === 0 ? 0 : startA) : b; // Default b based on a
  const startC =
    c === undefined ? (startA === 0 && startB === 0 ? 1 : startB) : c; // Default c based on a and b

  if (count <= 0) return [];
  if (count === 1) return [startA];
  if (count === 2) return [startA, startB];

  const sequence: number[] = [startA, startB, startC];

  for (let i = 3; i < count; i++) {
    const nextValue = sequence[i - 1] + sequence[i - 2] + sequence[i - 3];
    sequence.push(nextValue);
  }

  return sequence.slice(0, count); // Ensure correct length
};
