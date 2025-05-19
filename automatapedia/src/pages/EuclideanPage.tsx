import React, { useState } from "react";
import { executeEuclideanAlgorithm } from "../sequences/euclidean";
import type { EuclideanStep } from "../sequences/euclidean";
import "./SequencePage.css"; // Common styles

const EuclideanPage: React.FC = () => {
  const [numA, setNumA] = useState<number>(48);
  const [numB, setNumB] = useState<number>(18);
  const [steps, setSteps] = useState<EuclideanStep[]>([]);
  const [showSteps, setShowSteps] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleCalculateGCD = () => {
    if (numA <= 0 || numB <= 0) {
      setError("Please enter positive integers for both numbers.");
      setSteps([]);
      setShowSteps(false);
      return;
    }
    setError("");
    setSteps(executeEuclideanAlgorithm(numA, numB));
    setShowSteps(true);
  };

  const handleNumAChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(event.target.value, 10);
    setNumA(isNaN(val) ? 0 : val);
    setShowSteps(false); // Hide steps when input changes
  };

  const handleNumBChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(event.target.value, 10);
    setNumB(isNaN(val) ? 0 : val);
    setShowSteps(false); // Hide steps when input changes
  };

  const gcdResult =
    steps.length > 0 && steps[steps.length - 1].b === 0
      ? steps[steps.length - 1].a
      : null;

  return (
    <div className="container sequence-page">
      <header className="sequence-header">
        <h1>Euclidean Algorithm</h1>
        <p className="sequence-intro">
          The Euclidean algorithm is an efficient method for computing the
          greatest common divisor (GCD) of two integers. It is named after the
          ancient Greek mathematician Euclid, who described it in his Elements
          (c. 300 BC).
        </p>
        <div className="algorithm-rules">
          <p>The algorithm is based on the following principles:</p>
          <ol>
            <li>
              Pokud <code>A = 0</code> pak <code>GCD(A,B) = B</code>. Pokud{" "}
              <code>B = 0</code> pak <code>GCD(A,B) = A</code>.
            </li>
            <li>
              Napište <code>A = B*Q + R</code> kde <code>Q</code> je podíl a{" "}
              <code>R</code> je zbytek.
            </li>
            <li>
              Potom <code>GCD(A,B) = GCD(B,R)</code>.
            </li>
          </ol>
          <p>
            The algorithm proceeds by successive divisions, using the remainder
            of each step as the divisor in the next step, until the remainder
            becomes zero. The last non-zero remainder is the GCD.
          </p>
        </div>
      </header>

      <section className="interactive-generator">
        <h2>Generate Euclidean Algorithm Steps</h2>
        <div className="input-grid">
          <label htmlFor="numA">First Number:</label>
          <input
            type="number"
            id="numA"
            value={numA === 0 ? "" : numA}
            onChange={handleNumAChange}
            min="1"
          />
          <label htmlFor="numB">Second Number:</label>
          <input
            type="number"
            id="numB"
            value={numB === 0 ? "" : numB}
            onChange={handleNumBChange}
            min="1"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button onClick={handleCalculateGCD} className="generate-button">
          Calculate GCD
        </button>
      </section>

      {showSteps && steps.length > 0 && (
        <section className="results">
          <h2>Algorithm Steps:</h2>
          <div className="sequence-values euclidean-steps-display">
            {steps.map((step, index) => (
              <div key={index} className="euclidean-step">
                {step.b !== 0
                  ? `${step.a} = ${step.quotient} × ${step.b} + ${step.remainder}`
                  : `The remainder is 0. So, GCD = ${step.a}`}
              </div>
            ))}
          </div>
          {gcdResult !== null && (
            <p className="gcd-result">
              <strong>Greatest Common Divisor (GCD) = {gcdResult}</strong>
            </p>
          )}
        </section>
      )}

      <section className="sequence-info">
        <h2>Connection to Automata Theory</h2>
        <p>
          The Euclidean algorithm can be modeled as a state machine where each
          state represents a pair of numbers (a, b), and transitions between
          states correspond to the division steps of the algorithm. The
          algorithm starts in an initial state (input numbers) and transitions
          until it reaches a final state where one number is zero, revealing the
          GCD.
        </p>
        <p>
          This connection illustrates how algorithmic processes can be
          represented as computational models, which is a fundamental concept in
          automata theory. Automata are abstract machines that follow a sequence
          of operations to perform computations, and the Euclidean algorithm
          provides a simple yet powerful example of such a process.
        </p>
        <p>
          The sequence of division steps in the Euclidean algorithm demonstrates
          how a deterministic process can efficiently solve mathematical
          problems, exemplifying principles that are central to computational
          theory and the design of algorithms.
        </p>
      </section>
    </div>
  );
};

export default EuclideanPage;
