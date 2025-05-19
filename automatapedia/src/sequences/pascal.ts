export const generatePascalsTriangle = (rows: number): number[][] => {
  if (rows <= 0) {
    return [];
  }
  if (rows === 1) {
    return [[1]];
  }

  const triangle: number[][] = [[1]];

  for (let i = 1; i < rows; i++) {
    const prevRow = triangle[i - 1];
    const currentRow: number[] = [1]; // First element is always 1

    for (let j = 1; j < i; j++) {
      currentRow.push(prevRow[j - 1] + prevRow[j]);
    }

    currentRow.push(1); // Last element is always 1
    triangle.push(currentRow);
  }

  return triangle;
};
