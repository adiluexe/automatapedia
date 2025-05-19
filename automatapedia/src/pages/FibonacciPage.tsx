import React, { useState } from "react";
import { generateFibonacciSequence } from "../sequences/fibonacci";
import "../App.css";

const FibonacciPage: React.FC = () => {
  const [terms, setTerms] = useState<number>(10);
  // Optional: Allow user to set starting values
  // const [startVal1, setStartVal1] = useState<number>(0);
  // const [startVal2, setStartVal2] = useState<number>(1);
  const [sequence, setSequence] = useState<number[]>(
    generateFibonacciSequence(10)
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numTerms = parseInt(event.target.value, 10);
    if (!isNaN(numTerms) && numTerms > 0) {
      setTerms(numTerms);
      setSequence(generateFibonacciSequence(numTerms)); // Pass startVal1, startVal2 if implementing custom start
    } else if (event.target.value === "") {
      setTerms(0);
      setSequence([]);
    }
  };

  return (
    <div className="container">
      <h1>Fibonacci Sequence</h1>
      <div className="input-container">
        <label htmlFor="terms">Number of terms: </label>
        <input
          type="number"
          id="terms"
          value={terms === 0 ? "" : terms}
          onChange={handleInputChange}
          min="1"
        />
      </div>
      {/* Optional inputs for starting values can be added here */}
      <div className="sequence-container">
        {sequence.map((num, index) => (
          <span key={index} className="sequence-element">
            {num}
            {index < sequence.length - 1 ? ", " : ""}
          </span>
        ))}
      </div>
      <div className="info-container">
        <p>
          The Fibonacci sequence is a series of numbers where each number is the
          sum of the two preceding ones, usually starting with 0 and 1.
        </p>
      </div>
    </div>
  );
};

export default FibonacciPage;
