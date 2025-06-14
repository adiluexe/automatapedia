import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas"; // Import html2canvas
import { generatePascalsTriangle } from "../sequences/pascal";
import "./SequencePage.css"; // Common styles

const PascalPage: React.FC = () => {
  const [numRows, setNumRows] = useState<number>(5); // Represents the highest row index (0-indexed) to display
  const [triangle, setTriangle] = useState<number[][]>(
    generatePascalsTriangle(5) // Initialize with default (generates rows 0 through 5)
  );
  const [showTriangle, setShowTriangle] = useState<boolean>(true); // Show by default
  const [error, setError] = React.useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1); // Zoom functionality
  const visualizationRef = React.useRef<HTMLDivElement>(null);

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

  const handleNumRowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
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
  };  // Zoom functionality
  const handleZoomIn = () => {
    setZoomLevel(prevZoom => Math.min(prevZoom + 0.1, 3)); // Max zoom 3x, 10% increments
  };
  const handleZoomOut = () => {
    setZoomLevel(prevZoom => Math.max(prevZoom - 0.1, 0.1)); // Min zoom 0.1x, 10% decrements
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };  // Enhanced download function that captures the complete triangle
  const handleDownloadImage = () => {
    if (!triangle || triangle.length === 0) {
      setError("Please generate a triangle first.");
      return;
    }    // Get current theme colors from CSS variables
    const computedStyle = getComputedStyle(document.documentElement);
    const backgroundColor = computedStyle.getPropertyValue('--background-color').trim() || '#ffffff';
    const textColor = computedStyle.getPropertyValue('--text-color').trim() || '#333333';
    const cardBackgroundColor = computedStyle.getPropertyValue('--background-color-light').trim() || '#f9f9f9';
    const primaryColor = computedStyle.getPropertyValue('--primary-color').trim() || '#333333';
    const borderColor = computedStyle.getPropertyValue('--secondary-color').trim() || '#cccccc';

    // Create a temporary container for the download
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.top = '-9999px';
    tempContainer.style.left = '-9999px';
    tempContainer.style.backgroundColor = backgroundColor;
    tempContainer.style.padding = '20px';
    tempContainer.style.fontFamily = getComputedStyle(document.body).fontFamily;
    tempContainer.style.fontSize = '14px';
    tempContainer.style.color = textColor;

    // Add title
    const title = document.createElement('h2');
    title.textContent = `Pascal's Triangle (Rows 0 to ${numRows})`;
    title.style.textAlign = 'center';
    title.style.marginBottom = '20px';
    title.style.color = primaryColor;
    tempContainer.appendChild(title);

    // Create the triangle content
    const triangleContainer = document.createElement('div');
    triangleContainer.style.display = 'flex';
    triangleContainer.style.flexDirection = 'column';
    triangleContainer.style.alignItems = 'center';    triangle.forEach((row) => {
      const rowDiv = document.createElement('div');
      rowDiv.style.display = 'flex';
      rowDiv.style.justifyContent = 'center';
      rowDiv.style.marginBottom = '5px';

      row.forEach((num) => {
        const numSpan = document.createElement('span');
        numSpan.textContent = num.toString();
        numSpan.style.padding = '5px 10px';
        numSpan.style.minWidth = '40px';
        numSpan.style.textAlign = 'center';        numSpan.style.border = `1px solid ${borderColor}`;
        numSpan.style.borderRadius = '4px';
        numSpan.style.margin = '2px';
        numSpan.style.backgroundColor = cardBackgroundColor;
        numSpan.style.color = textColor;
        numSpan.style.fontSize = '14px';
        rowDiv.appendChild(numSpan);
      });

      triangleContainer.appendChild(rowDiv);
    });

    tempContainer.appendChild(triangleContainer);
    document.body.appendChild(tempContainer);    // Capture the temporary container
    html2canvas(tempContainer, {
      background: backgroundColor,
      useCORS: true,
      logging: false
    })
      .then((canvas) => {
        const link = document.createElement("a");
        link.download = `pascals_triangle_rows_0_to_${numRows}.png`;
        link.href = canvas.toDataURL("image/png", 0.95);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        document.body.removeChild(tempContainer); // Clean up
      })
      .catch((err) => {
        setError("Failed to download image: " + err.message);
        console.error("Error downloading image: ", err);
        document.body.removeChild(tempContainer); // Clean up even on error
      });
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
          />
          <button onClick={handleGenerateTriangle} className="generate-button">
            Generate
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </section>      {showTriangle && triangle.length > 0 && (
        <section className="results card">
          <div
            className="results-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <h2>Pascal's Triangle (Rows 0 to {numRows})</h2>
            <div
              className="action-buttons"
              style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}
            >
              <div 
                className="zoom-controls"
                style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}
              >
                <button 
                  onClick={handleZoomOut} 
                  className="button-style-secondary" 
                  title="Zoom Out"
                  style={{ minWidth: "35px", padding: "5px 8px" }}
                >
                  −
                </button>
                <button 
                  onClick={handleResetZoom} 
                  className="button-style-secondary" 
                  title="Reset Zoom"
                  style={{ minWidth: "60px", padding: "5px 8px", fontSize: "0.85em" }}
                >
                  {Math.round(zoomLevel * 100)}%
                </button>
                <button 
                  onClick={handleZoomIn} 
                  className="button-style-secondary" 
                  title="Zoom In"
                  style={{ minWidth: "35px", padding: "5px 8px" }}
                >
                  +
                </button>
              </div>
              <button 
                onClick={handleDownloadImage} 
                className="button-style-secondary"
                title="Download as Image"
              >
                📥
              </button>
              <button onClick={toggleFullScreen} className="button-style">
                {isFullScreen ? "Exit Fullscreen" : "View Fullscreen"}
              </button>
            </div>
          </div>          <div
            ref={visualizationRef}
            className="visualization-placeholder pascal-triangle-visualization"
            style={{
              maxHeight: isFullScreen ? "100vh" : "500px",
              overflowY: "auto",
              overflowX: "auto",
              backgroundColor: isFullScreen
                ? "var(--background-color, white)"
                : "transparent",
              padding: isFullScreen ? "0" : "0",
              boxSizing: "border-box",
              display: isFullScreen ? "flex" : "block",
              flexDirection: isFullScreen ? "column" : "initial",
              position: "relative",
            }}
          >{isFullScreen && (
              <div 
                className="fullscreen-visualization-header"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 20px",
                  backgroundColor: "var(--card-background-color)",
                  borderBottom: "1px solid var(--text-color)",
                  flexShrink: 0,
                  gap: "1rem"
                }}
              >
                <h3 style={{ margin: 0, color: "var(--text-color)" }}>
                  Pascal's Triangle (Rows 0 to {numRows})
                </h3>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <div 
                    className="zoom-controls"
                    style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}
                  >
                    <button 
                      onClick={handleZoomOut} 
                      className="button-style-secondary" 
                      title="Zoom Out"
                      style={{ minWidth: "40px", padding: "8px 10px", fontSize: "1.1em" }}
                    >
                      −
                    </button>
                    <button 
                      onClick={handleResetZoom} 
                      className="button-style-secondary" 
                      title="Reset Zoom"
                      style={{ minWidth: "70px", padding: "8px 10px" }}
                    >
                      {Math.round(zoomLevel * 100)}%
                    </button>
                    <button 
                      onClick={handleZoomIn} 
                      className="button-style-secondary" 
                      title="Zoom In"
                      style={{ minWidth: "40px", padding: "8px 10px", fontSize: "1.1em" }}
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={handleDownloadImage} 
                    className="button-style-secondary"
                    title="Download as Image"
                    style={{ padding: "8px 12px" }}
                  >
                    📥
                  </button>
                  <button 
                    onClick={toggleFullScreen} 
                    className="button-style"
                    style={{ padding: "8px 16px" }}
                  >
                    Exit Fullscreen
                  </button>
                </div>
              </div>
            )}{/* Wrapper to ensure horizontal scrolling works correctly */}
            <div 
              style={{ 
                display: "inline-block",
                transform: `scale(${zoomLevel})`,
                transformOrigin: "top center",
                transition: "transform 0.3s ease"
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
                        minWidth: isFullScreen ? "auto" : "40px", // Allow natural width in fullscreen
                        textAlign: "center",
                        border: "1px solid var(--text-color)", // Use CSS variable for border
                        borderRadius: "4px",
                        margin: "2px",
                        display: "inline-block", // Ensures proper block-like behavior for padding/sizing
                        whiteSpace: "nowrap", // Prevents numbers from wrapping to the next line
                        overflow: isFullScreen ? "clip" : "hidden", // Use clip in fullscreen, hidden otherwise
                        textOverflow: isFullScreen ? "clip" : "ellipsis", // Don't use ellipsis in fullscreen
                        backgroundColor: "var(--card-background-color)", // Use CSS variable for background
                        color: "var(--text-color)", // Use CSS variable for text color
                        // Removed flexGrow, flexShrink, flexBasis to let items size naturally
                      }}
                    >
                      {num}
                    </span>
                  ))}
                </div>
              ))}
            </div>{" "}
            {/* End of wrapper for horizontal scrolling */}
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
