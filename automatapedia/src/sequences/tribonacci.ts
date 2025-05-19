export const generateTribonacciSequence = (
  terms: number,
  startValues?: [number, number, number]
): number[] => {
  if (terms <= 0) {
    return [];
  }

  const a = startValues ? startValues[0] : 0;
  const b = startValues ? startValues[1] : 0;
  const c = startValues ? startValues[2] : 1;

  if (terms === 1) {
    return [a];
  }
  if (terms === 2) {
    return [a, b];
  }

  const sequence: number[] = [a, b, c];

  for (let i = 3; i < terms; i++) {
    const nextValue = sequence[i - 1] + sequence[i - 2] + sequence[i - 3];
    sequence.push(nextValue);
  }

  return sequence;
};
