import React, { useState } from "react";
import { generatePascalsTriangle } from "../sequences/pascal";
import "../App.css"; // Assuming you have some global styles

const PascalPage: React.FC = () => {
  const [rows, setRows] = useState<number>(5);
  const [triangle, setTriangle] = useState<number[][]>(
    generatePascalsTriangle(5)
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numRows = parseInt(event.target.value, 10);
    if (!isNaN(numRows) && numRows > 0) {
      setRows(numRows);
      setTriangle(generatePascalsTriangle(numRows));
    } else if (event.target.value === "") {
      setRows(0);
      setTriangle([]);
    }
  };

  return (
    <div className="container">
      <h1>Pascal's Triangle</h1>
      <div className="input-container">
        <label htmlFor="rows">Enter number of rows: </label>
        <input
          type="number"
          id="rows"
          value={rows === 0 ? "" : rows}
          onChange={handleInputChange}
          min="1"
        />
      </div>
      <div className="pascal-triangle-container">
        {triangle.map((row, rowIndex) => (
          <div key={rowIndex} className="pascal-row">
            {row.map((num, numIndex) => (
              <span key={numIndex} className="pascal-number">
                {num}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PascalPage;
