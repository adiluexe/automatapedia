import React, { useState } from "react";
import { generateLucasSequence } from "../sequences/lucas";
import "../App.css";

const LucasPage: React.FC = () => {
  const [terms, setTerms] = useState<number>(10);
  const [sequence, setSequence] = useState<number[]>(generateLucasSequence(10));

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numTerms = parseInt(event.target.value, 10);
    if (!isNaN(numTerms) && numTerms > 0) {
      setTerms(numTerms);
      setSequence(generateLucasSequence(numTerms));
    } else if (event.target.value === "") {
      setTerms(0);
      setSequence([]);
    }
  };

  return (
    <div className="container">
      <h1>Lucas Sequence</h1>
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
          The Lucas sequence is a generalization of the Fibonacci sequence. The
          standard Lucas numbers begin with L_0 = 2 and L_1 = 1, and each
          subsequent number is the sum of the two preceding ones.
        </p>
      </div>
    </div>
  );
};

export default LucasPage;
