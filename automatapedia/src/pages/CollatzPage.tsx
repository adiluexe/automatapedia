import React, { useState } from "react";
import { generateCollatzSequence } from "../sequences/collatz";
import "../App.css"; // General app styles
import "./SequencePage.css"; // Specific styles for sequence pages

const CollatzPage: React.FC = () => {
  const [startNumber, setStartNumber] = useState<number>(17); // Default to 17 as in image
  const [sequence, setSequence] = useState<number[]>(
    generateCollatzSequence(17)
  );
  const [inputValue, setInputValue] = useState<string>("17");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleGenerateSequence = () => {
    const num = parseInt(inputValue, 10);
    if (!isNaN(num) && num > 0) {
      setStartNumber(num);
      setSequence(generateCollatzSequence(num));
    } else {
      // Optionally, handle invalid input, e.g., show an error message
      setStartNumber(0); // Or keep previous valid number
      setSequence([]); // Or keep previous sequence
    }
  };

  const sequenceSteps = sequence.length > 0 ? sequence.length - 1 : 0;

  return (
    <div className="sequence-page-container">
      <header className="sequence-page-header">
        <h1>Collatz Sequence</h1>
      </header>

      <section className="sequence-intro-section card">
        <h2>What is the Collatz Sequence?</h2>
        <p>
          The Collatz conjecture is one of the most famous unsolved problems in
          mathematics. The sequence is defined as follows:
        </p>
        <ul className="sequence-rules">
          <li>Start with any positive integer n.</li>
          <li>If n is even, the next term is n/2.</li>
          <li>If n is odd, the next term is 3n+1.</li>
          <li>Repeat until you reach 1.</li>
        </ul>
        <p>
          The conjecture states that no matter which positive integer you start
          with, the sequence will always reach 1. Despite its simple definition,
          this conjecture remains unproven since it was first proposed in 1937.
        </p>
      </section>

      <section className="sequence-generator-section card">
        <h2>Generate Collatz Sequence</h2>
        <div className="input-group">
          <label htmlFor="startNumber">Starting Number:</label>
          <input
            type="number"
            id="startNumber"
            value={inputValue}
            onChange={handleInputChange}
            min="1"
          />
          <button onClick={handleGenerateSequence} className="generate-button">
            Generate
          </button>
        </div>

        {sequence.length > 0 && startNumber > 0 && (
          <div className="results-display">
            <h3>Results:</h3>
            <p>
              Starting from {startNumber}, the sequence reached 1 in{" "}
              {sequenceSteps} step{sequenceSteps !== 1 ? "s" : ""}.
            </p>

            {/* Placeholder for Chart Visualization */}
            <div className="visualization-placeholder">
              {/* This is where the chart would go. For now, a simple message. */}
              <p>[Chart Visualization of the sequence values against steps]</p>
              {/* Example of how you might map data for a simple bar chart or line graph */}
              {/* <div style={{ display: 'flex', alignItems: 'flex-end', height: '150px', border: '1px solid var(--secondary-color)'}}>
                {sequence.map((val, idx) => (
                  <div key={idx} style={{ width: '20px', height: `${val}px`, backgroundColor: 'var(--primary-color)', margin: '0 2px', textAlign: 'center', color: 'white', fontSize:'10px' }}>
                    {val}
                  </div>
                ))}
              </div> */}
            </div>

            <h4>Sequence Values:</h4>
            <div className="sequence-values">
              {sequence.map((num, index) => (
                <span key={index} className="sequence-element">
                  {num}
                  {index < sequence.length - 1 ? " – " : ""}
                </span>
              ))}
            </div>
          </div>
        )}
        {startNumber <= 0 && inputValue !== "" && (
          <p className="error-message">
            Please enter a positive starting number.
          </p>
        )}
      </section>

      <section className="sequence-automata-connection card">
        <h2>Connection to Automata Theory</h2>
        <p>
          The Collatz Conjecture relates to automata theory through the concept
          of state transitions. Each number in the sequence can be seen as a
          "state" in an automaton, with the Collatz function defining the
          transition rules between states.
        </p>
        <p>
          Some researchers have modeled the Collatz process as a "tag system" or
          abstract automaton to study its properties and investigate whether all
          starting values eventually reach the "terminal state" of 1.
        </p>
      </section>
    </div>
  );
};

export default CollatzPage;
