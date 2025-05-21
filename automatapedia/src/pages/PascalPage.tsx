import React, { useState, useRef, useEffect } from "react";
import { generatePascalsTriangle } from "../sequences/pascal";
import "./SequencePage.css"; // Common styles

const PascalPage: React.FC = () => {
  const [numRows, setNumRows] = useState<number>(5); // Represents the highest row index (0-indexed) to display
  const [triangle, setTriangle] = useState<number[][]>(
    generatePascalsTriangle(5) // Initialize with default (generates rows 0 through 5)
  );
  const [showTriangle, setShowTriangle] = useState<boolean>(true); // Show by default
  const [error, setError] = useState<string>("");
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const visualizationRef = useRef<HTMLDivElement>(null);

  const handleGenerateTriangle = () => {
    if (numRows < 0) {
      setError("Please enter a non-negative number for the highest row index.");
      setTriangle([]);
      setShowTriangle(false);
      return;
    }
    // Removed the upper limit check (numRows > 20)
    setError("");
    setTriangle(generatePascalsTriangle(numRows)); // numRows is directly the highestRowIndex
    setShowTriangle(true);
  };

  const handleNumRowsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setNumRows(isNaN(value) ? 0 : value);
    setShowTriangle(false); // Hide triangle when input changes
  };

  const toggleFullScreen = () => {
    if (!visualizationRef.current) return;

    if (!document.fullscreenElement) {
      visualizationRef.current.requestFullscreen().catch((err) => {
        alert(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
        );
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  return (
    <div className="sequence-page-container">
      <header className="sequence-page-header">
        <h1>Pascal's Triangle</h1>
      </header>

      <section className="sequence-intro-section card">
        <h2>What is Pascal's Triangle?</h2>
        <p>
          Pascal's Triangle is a triangular array of binomial coefficients. It
          is named after the French mathematician Blaise Pascal, though other
          mathematicians had studied it centuries before him in India, Persia,
          China, Germany, and Italy. The rows of Pascal's triangle are
          conventionally enumerated starting with row n = 0 at the top (the 0th
          row is the single entry 1).
        </p>
        <div className="algorithm-rules">
          <p>
            <strong>Construction:</strong> Each entry of each row is constructed
            by adding the entry above and to the left with the entry above and
            to the right, treating blank entries as 0. For example, the initial
            number in the first (or any other) row is 1 (the sum of 0 and 1),
            whereas the numbers 1 and 3 in the third row are added to produce
            the number 4 in the fourth row.
          </p>
        </div>
      </section>

      <section className="sequence-generator-section card">
        <h2>Generate Pascal's Triangle</h2>
        <div className="input-group">
          <label htmlFor="numRows">
            Highest Row Index (n, where row 0 is the first row):
          </label>
          <input
            type="number"
            id="numRows"
            value={numRows}
            onChange={handleNumRowsChange}
            min="0"
            // Removed max="20"
          />
          <button onClick={handleGenerateTriangle} className="generate-button">
            Generate
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </section>

      {showTriangle && triangle.length > 0 && (
        <section className="results card">
          <div
            className="results-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2>Pascal's Triangle (Rows 0 to {numRows})</h2>
            <button onClick={toggleFullScreen} className="fullscreen-button">
              {isFullScreen ? "Exit Fullscreen" : "View Fullscreen"}
            </button>
          </div>
          <div
            ref={visualizationRef}
            className="visualization-placeholder pascal-triangle-visualization"
            style={{
              maxHeight: isFullScreen ? "100vh" : "500px",
              overflowY: "auto",
              overflowX: "auto",
              backgroundColor: isFullScreen
                ? "var(--background-color, white)"
                : "transparent",
              padding: isFullScreen ? "20px" : "0",
              boxSizing: "border-box",
            }}
          >
            {triangle.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="pascal-row"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "5px", // Add some space between rows
                }}
              >
                {row.map((num, numIndex) => (
                  <span
                    key={numIndex}
                    className="pascal-number"
                    style={{
                      padding: "5px 10px", // Adjusted padding for better spacing
                      minWidth: "40px", // Minimum width for smaller numbers, allows for slightly larger numbers too
                      textAlign: "center",
                      border: "1px solid var(--text-color, #ccc)",
                      borderRadius: "4px",
                      margin: "2px",
                      display: "inline-block", // Ensures proper block-like behavior for padding/sizing
                      whiteSpace: "nowrap", // Prevents numbers from wrapping to the next line
                      overflow: "hidden", // Hides part of the number if it's too large for the span
                      textOverflow: "ellipsis", // Shows '...' if the number is too large
                      backgroundColor: "var(--card-background-color, #f9f9f9)",
                      // Removed flexGrow, flexShrink, flexBasis to let items size naturally
                    }}
                  >
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
            <strong>Sum of Rows:</strong> The sum of the numbers in any row n is
            equal to 2<sup>n</sup> (e.g., for row n=0, sum is 2<sup>0</sup>=1;
            for row n=1, sum is 1+1=2<sup>1</sup>=2).
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
