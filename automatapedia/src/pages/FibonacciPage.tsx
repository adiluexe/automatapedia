import React, { useState, useEffect } from "react";
import { generateFibonacciSequence } from "../sequences/fibonacci";
import "../App.css"; // General app styles
import "./SequencePage.css"; // Specific styles for sequence pages

const FibonacciPage: React.FC = () => {
  const [numTerms, setNumTerms] = useState<number>(10);
  const [firstTerm, setFirstTerm] = useState<number>(0);
  const [secondTerm, setSecondTerm] = useState<number>(1);
  const [sequence, setSequence] = useState<number[]>([]);

  const [numTermsInput, setNumTermsInput] = useState<string>("10");
  const [firstTermInput, setFirstTermInput] = useState<string>("0");
  const [secondTermInput, setSecondTermInput] = useState<string>("1");
  const [error, setError] = useState<string>("");

  const handleGenerateSequence = () => {
    const terms = parseInt(numTermsInput, 10);
    const first = parseInt(firstTermInput, 10);
    const second = parseInt(secondTermInput, 10);

    if (isNaN(terms) || terms <= 0) {
      setError("Number of terms must be a positive integer.");
      setSequence([]);
      return;
    }
    if (isNaN(first) || isNaN(second)) {
      setError("First and second terms must be integers.");
      setSequence([]);
      return;
    }
    if (terms > 100) {
      setError("Please enter a number of terms less than or equal to 100.");
      setSequence([]);
      return;
    }

    setError("");
    setNumTerms(terms);
    setFirstTerm(first);
    setSecondTerm(second);
    setSequence(generateFibonacciSequence(terms, first, second));
  };

  // Generate sequence on initial load and when core parameters change if needed
  useEffect(() => {
    handleGenerateSequence();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Removed dependencies to only run on mount, button click will regenerate

  return (
    <div className="sequence-page-container">
      <header className="sequence-page-header">
        <h1>Fibonacci Sequence</h1>
      </header>

      <section className="sequence-intro-section card">
        <h2>What is the Fibonacci Sequence?</h2>
        <p>
          The Fibonacci sequence is a series of numbers where each number is the
          sum of the two preceding ones, usually starting with 0 and 1. The
          sequence commonly appears in nature and has numerous mathematical
          properties.
        </p>
        <div className="sequence-definition">
          <p>F(0) = 0</p>
          <p>F(1) = 1</p>
          <p>F(n) = F(n-1) + F(n-2) for n &gt; 1</p>
        </div>
        <p>The first few terms are: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...</p>
      </section>

      <section className="sequence-generator-section card">
        <h2>Generate Fibonacci Sequence</h2>
        <div className="input-grid">
          <div className="input-group">
            <label htmlFor="numTerms">Number of Terms:</label>
            <input
              type="number"
              id="numTerms"
              value={numTermsInput}
              onChange={(e) => setNumTermsInput(e.target.value)}
              min="1"
              max="100" // Max limit
            />
          </div>
          <div className="input-group">
            <label htmlFor="firstTerm">First Term:</label>
            <input
              type="number"
              id="firstTerm"
              value={firstTermInput}
              onChange={(e) => setFirstTermInput(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="secondTerm">Second Term:</label>
            <input
              type="number"
              id="secondTerm"
              value={secondTermInput}
              onChange={(e) => setSecondTermInput(e.target.value)}
            />
          </div>
        </div>
        <button onClick={handleGenerateSequence} className="generate-button">
          Generate
        </button>

        {error && <p className="error-message">{error}</p>}

        {sequence.length > 0 && !error && (
          <div className="results-display">
            <h3>Results:</h3>
            {/* Placeholder for Chart Visualization - As per PRD, list for linear sequences */}
            <div className="visualization-placeholder">
              <p>
                [Chart Visualization of Fibonacci sequence: Value vs. Term
                Number]
              </p>
              {/* Actual chart component would go here */}
            </div>
            <h4>Sequence Values:</h4>
            <div className="sequence-values">
              {sequence.map((num, index) => (
                <span key={index} className="sequence-element">
                  F(
                  {index +
                    (firstTerm === 0 &&
                    numTermsInput === "10" &&
                    secondTermInput === "1"
                      ? 0
                      : firstTerm)}
                  ) = {num}
                  {index < sequence.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="sequence-automata-connection card">
        <h2>Connection to Automata Theory</h2>
        <p>
          The Fibonacci sequence can be generated by a simple finite automaton
          with a recursive structure. This connection demonstrates how even
          complex sequences can emerge from simple computational rules.
        </p>
        <p>
          Additionally, the golden ratio (approximately 1.618), which is closely
          related to the Fibonacci sequence, appears in various aspects of
          automata theory, including optimal state minimization algorithms and
          the structure of certain regular languages.
        </p>
      </section>
    </div>
  );
};

export default FibonacciPage;
