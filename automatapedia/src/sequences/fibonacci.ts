export const generateFibonacciSequence = (
  terms: number,
  startValues?: [number, number]
): number[] => {
  if (terms <= 0) {
    return [];
  }

  const a = startValues ? startValues[0] : 0;
  const b = startValues ? startValues[1] : 1;

  if (terms === 1) {
    return [a];
  }

  const sequence: number[] = [a, b];

  for (let i = 2; i < terms; i++) {
    const nextValue = sequence[i - 1] + sequence[i - 2];
    sequence.push(nextValue);
  }

  return sequence;
};
