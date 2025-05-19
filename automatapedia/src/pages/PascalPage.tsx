import React, { useState } from "react";
import { generatePascalsTriangle } from "../sequences/pascal";
import "./SequencePage.css"; // Common styles

const PascalPage: React.FC = () => {
  const [numRows, setNumRows] = useState<number>(5);
  const [triangle, setTriangle] = useState<number[][]>(
    generatePascalsTriangle(5) // Initialize with default
  );
  const [showTriangle, setShowTriangle] = useState<boolean>(true); // Show by default
  const [error, setError] = useState<string>("");

  const handleGenerateTriangle = () => {
    if (numRows <= 0) {
      setError("Please enter a positive number of rows.");
      setTriangle([]);
      setShowTriangle(false);
      return;
    } else if (numRows > 20) {
      setError(
        "Please enter a number of rows less than or equal to 20 for optimal display."
      );
      setTriangle([]);
      setShowTriangle(false);
      return;
    }
    setError("");
    setTriangle(generatePascalsTriangle(numRows));
    setShowTriangle(true);
  };

  const handleNumRowsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setNumRows(isNaN(value) ? 0 : value);
    setShowTriangle(false); // Hide triangle when input changes
  };

  return (
    <div className="sequence-page-container">
      <header className="sequence-page-header">
        <h1>Pascal's Triangle</h1>
      </header>

      <section className="sequence-intro-section card">
        <h2>What is Pascal's Triangle?</h2>
        <p>
          Pascal's Triangle is a triangular array of numbers where each number
          is the sum of the two numbers directly above it. Named after the
          French mathematician Blaise Pascal, it has many interesting properties
          and applications.
        </p>
        <div className="algorithm-rules">
          <p>
            <strong>Rule:</strong> Each number is the sum of the two numbers
            directly above it (with 1s along the edges).
          </p>
          <p>
            The triangle begins with a single '1' at the top. Each subsequent
            row is constructed by adding the two numbers directly above to the
            left and right.
          </p>
        </div>
      </section>

      <section className="sequence-generator-section card">
        <h2>Generate Pascal's Triangle</h2>
        <div className="input-group">
          <label htmlFor="numRows">Number of Rows:</label>
          <input
            type="number"
            id="numRows"
            value={numRows === 0 ? "" : numRows}
            onChange={handleNumRowsChange}
            min="1"
            max="20" // Corresponds to error message
          />
          <button onClick={handleGenerateTriangle} className="generate-button">
            Generate
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </section>

      {showTriangle && triangle.length > 0 && (
        <section className="results card">
          <h2>Pascal's Triangle:</h2>
          <div className="visualization-placeholder pascal-triangle-visualization">
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
        </section>
      )}

      <section className="sequence-properties-section card">
        <h2>Properties of Pascal's Triangle</h2>
        <ul>
          <li>
            <strong>Binomial Coefficients:</strong> The numbers in each row
            correspond to the coefficients of the binomial expansion (a+b)
            <sup>n</sup>. For example, row 2 (1, 2, 1) corresponds to (a+b)
            <sup>2</sup> = 1a<sup>2</sup> + 2ab + 1b<sup>2</sup>.
          </li>
          <li>
            <strong>Sum of Rows:</strong> The sum of the numbers in any row is
            equal to 2<sup>n</sup>, where n is the row number (starting from
            n=0).
          </li>
          <li>
            <strong>Symmetry:</strong> The triangle is symmetrical along its
            vertical axis.
          </li>
          <li>
            <strong>Fibonacci Sequence:</strong> The sums of the shallow
            diagonals of Pascal's triangle are the Fibonacci numbers.
          </li>
          <li>
            <strong>Powers of 11:</strong> The first few rows, when their
            numbers are read as digits of a single number, correspond to powers
            of 11 (e.g., row 2: 121 = 11<sup>2</sup>; row 3: 1331 = 11
            <sup>3</sup>, with carrying for later rows).
          </li>
        </ul>
      </section>

      <section className="sequence-automata-connection card">
        <h2>Connection to Automata Theory</h2>
        <p>
          Pascal's Triangle is connected to automata theory through cellular
          automata. Each row of the triangle can be generated using a simple
          cellular automaton rule. If you consider the entries modulo 2 (i.e.,
          whether they are odd or even), the pattern that emerges is
          Sierpinski's Triangle. This pattern can be generated by a 1D cellular
          automaton, specifically Rule 90 in the Wolfram classification.
        </p>
        <p>
          More generally, the generation of each element based on its neighbors
          (the two numbers above it) is a core concept in cellular automata.
          This demonstrates how complex global patterns can emerge from simple,
          local rules—a fundamental concept in automata theory and the study of
          computational systems. The structure of Pascal's triangle also appears
          in the analysis of paths in certain types of grid graphs, which can be
          related to the state transitions in an automaton.
        </p>
      </section>
    </div>
  );
};

export default PascalPage;
