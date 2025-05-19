import React, { useState } from "react";
import { generateTribonacciSequence } from "../sequences/tribonacci";
import "../App.css";

const TribonacciPage: React.FC = () => {
  const [terms, setTerms] = useState<number>(10);
  // Optional: Allow user to set starting values
  // const [startVal1, setStartVal1] = useState<number>(0);
  // const [startVal2, setStartVal2] = useState<number>(0);
  // const [startVal3, setStartVal3] = useState<number>(1);
  const [sequence, setSequence] = useState<number[]>(
    generateTribonacciSequence(10)
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numTerms = parseInt(event.target.value, 10);
    if (!isNaN(numTerms) && numTerms > 0) {
      setTerms(numTerms);
      // Pass startVal1, startVal2, startVal3 if implementing custom start
      setSequence(generateTribonacciSequence(numTerms));
    } else if (event.target.value === "") {
      setTerms(0);
      setSequence([]);
    }
  };

  return (
    <div className="container">
      <h1>Tribonacci Sequence</h1>
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
          The Tribonacci sequence is a generalization of the Fibonacci sequence
          where each term is the sum of the three preceding terms. The standard
          sequence starts with 0, 0, 1.
        </p>
      </div>
    </div>
  );
};

export default TribonacciPage;
