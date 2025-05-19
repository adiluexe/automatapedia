export const generateLucasSequence = (count: number): number[] => {
  if (count <= 0) return [];

  const sequence: number[] = [];
  if (count >= 1) {
    sequence.push(2); // L(0) = 2
  }
  if (count >= 2) {
    sequence.push(1); // L(1) = 1
  }

  for (let i = 2; i < count; i++) {
    const nextValue = sequence[i - 1] + sequence[i - 2];
    sequence.push(nextValue);
  }

  return sequence;
};
