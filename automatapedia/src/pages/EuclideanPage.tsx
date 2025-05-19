import React, { useState } from "react";
import { executeEuclideanAlgorithm } from "../sequences/euclidean";
import type { EuclideanStep } from "../sequences/euclidean"; // Corrected import
import "../App.css";

const EuclideanPage: React.FC = () => {
  const [numA, setNumA] = useState<number>(48);
  const [numB, setNumB] = useState<number>(18);
  const [steps, setSteps] = useState<EuclideanStep[]>(
    executeEuclideanAlgorithm(48, 18)
  );

  const handleNumAChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(event.target.value, 10);
    if (!isNaN(val) && val > 0) {
      setNumA(val);
      setSteps(executeEuclideanAlgorithm(val, numB));
    } else if (event.target.value === "") {
      setNumA(0);
      setSteps([]);
    }
  };

  const handleNumBChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(event.target.value, 10);
    if (!isNaN(val) && val > 0) {
      setNumB(val);
      setSteps(executeEuclideanAlgorithm(numA, val));
    } else if (event.target.value === "") {
      setNumB(0);
      setSteps([]);
    }
  };

  const gcd =
    steps.length > 0 && steps[steps.length - 1].b === 0
      ? steps[steps.length - 1].a
      : null;

  return (
    <div className="container">
      <h1>Euclidean Algorithm</h1>
      <div className="input-container">
        <label htmlFor="numA">Enter first positive integer (a): </label>
        <input
          type="number"
          id="numA"
          value={numA === 0 ? "" : numA}
          onChange={handleNumAChange}
          min="1"
        />
      </div>
      <div className="input-container">
        <label htmlFor="numB">Enter second positive integer (b): </label>
        <input
          type="number"
          id="numB"
          value={numB === 0 ? "" : numB}
          onChange={handleNumBChange}
          min="1"
        />
      </div>
      <div className="euclidean-steps-container">
        {steps.map((step, index) => (
          <div key={index} className="euclidean-step">
            {step.b !== 0
              ? `${step.a} = ${step.quotient} * ${step.b} + ${step.remainder}`
              : `GCD = ${step.a}`}
          </div>
        ))}
      </div>
      {gcd !== null && (
        <div className="info-container">
          <p>The Greatest Common Divisor (GCD) is {gcd}.</p>
        </div>
      )}
      <div className="info-container">
        <p>
          The Euclidean algorithm is an efficient method for computing the
          greatest common divisor (GCD) of two integers. It is one of the oldest
          algorithms in common use.
        </p>
      </div>
    </div>
  );
};

export default EuclideanPage;
