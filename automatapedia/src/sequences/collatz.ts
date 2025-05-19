export const generateCollatzSequence = (startNumber: number): number[] => {
  if (startNumber <= 0) {
    return [];
  }

  const sequence: number[] = [startNumber];
  let currentNumber = startNumber;

  while (currentNumber !== 1) {
    if (currentNumber % 2 === 0) {
      currentNumber = currentNumber / 2;
    } else {
      currentNumber = 3 * currentNumber + 1;
    }
    sequence.push(currentNumber);
    // Safety break for very long sequences, though Collatz is conjectured to always reach 1
    if (sequence.length > 1000) {
      console.warn("Collatz sequence exceeded 1000 steps, breaking.");
      break;
    }
  }
  return sequence;
};
