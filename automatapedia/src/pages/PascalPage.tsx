import React, { useState } from "react";
import { generatePascalsTriangle } from "../sequences/pascal";
import "./SequencePage.css"; // Common styles

const PascalPage: React.FC = () => {
  const [numRows, setNumRows] = useState<number>(5);
  const [triangle, setTriangle] = useState<number[][]>([]);
  const [showTriangle, setShowTriangle] = useState<boolean>(false);
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
    <div className="container sequence-page">
      <header className="sequence-header">
        <h1>Pascal's Triangle</h1>
        <p className="sequence-intro">
          Pascal's Triangle is a triangular array of numbers where each number
          is the sum of the two numbers directly above it. Named after the
          French mathematician Blaise Pascal, it has many interesting properties
          and applications.
        </p>
        <div className="algorithm-rules">
          <p>Each number is the sum of the two numbers above it.</p>
          <p>
            The triangle contains many patterns, including the binomial
            coefficients, Fibonacci sequence, and many other number sequences.
          </p>
        </div>
      </header>

      <section className="interactive-generator">
        <h2>Generate Pascal's Triangle</h2>
        <div className="input-grid">
          <label htmlFor="numRows">Number of Rows:</label>
          <input
            type="number"
            id="numRows"
            value={numRows === 0 ? "" : numRows}
            onChange={handleNumRowsChange}
            min="1"
            max="20" // Corresponds to error message
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button onClick={handleGenerateTriangle} className="generate-button">
          Generate
        </button>
      </section>

      {showTriangle && triangle.length > 0 && (
        <section className="results">
          <h2>Pascal's Triangle:</h2>
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
        </section>
      )}

      <section className="sequence-info">
        <h2>Properties:</h2>
        <ul>
          <li>
            The sum of each row is a power of 2 (i.e., 2<sup>row number</sup>,
            starting with row 0).
          </li>
          <li>The triangle contains the binomial coefficients.</li>
          <li>
            The rows contain patterns related to various sequences, including
            Fibonacci.
          </li>
          <li>The triangle has many geometric interpretations.</li>
        </ul>
      </section>

      <section className="sequence-info">
        <h2>Connection to Automata Theory</h2>
        <p>
          Pascal's Triangle is connected to automata theory through cellular
          automata. Each row of the triangle can be generated using a simple
          cellular automaton rule, specifically Rule 90 in the Wolfram
          classification if you consider the entries modulo 2 (Sierpinski's
          Triangle pattern).
        </p>
        <p>
          More generally, the generation of each element based on its neighbors
          is a core concept in cellular automata. This demonstrates how complex
          patterns can emerge from simple local rules, a fundamental concept in
          automata theory and computational systems. The structure of Pascal's
          triangle also appears in the analysis of paths in certain types of
          grid graphs, which can be related to the state transitions in an
          automaton.
        </p>
      </section>
    </div>
  );
};

export default PascalPage;
