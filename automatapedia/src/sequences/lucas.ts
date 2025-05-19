export const generateLucasSequence = (terms: number): number[] => {
  if (terms <= 0) {
    return [];
  }
  if (terms === 1) {
    return [2]; // L_0 = 2
  }

  const sequence: number[] = [2, 1]; // L_0 = 2, L_1 = 1

  for (let i = 2; i < terms; i++) {
    const nextValue = sequence[i - 1] + sequence[i - 2];
    sequence.push(nextValue);
  }

  return sequence;
};
