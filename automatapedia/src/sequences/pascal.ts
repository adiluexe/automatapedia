export const generatePascalsTriangle = (
  highestRowIndex: number
): number[][] => {
  if (highestRowIndex < 0) {
    return []; // No rows if index is negative
  }

  const triangle: number[][] = [];
  for (let i = 0; i <= highestRowIndex; i++) {
    // Loop from row 0 up to and including highestRowIndex
    const row: number[] = [];
    for (let j = 0; j <= i; j++) {
      if (j === 0 || j === i) {
        row.push(1);
      } else {
        // Accessing triangle[i-1] which is the previous row
        // This is safe because for i > 0, triangle[i-1] will exist
        row.push(triangle[i - 1][j - 1] + triangle[i - 1][j]);
      }
    }
    triangle.push(row);
  }

  return triangle;
};
