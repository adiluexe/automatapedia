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
    <div className="sequence-page-container">
      {" "}
      {/* Changed from "container sequence-page" */}
      <header className="sequence-page-header">
        {" "}
        {/* Added header */}
        <h1>Euclidean Algorithm</h1>
      </header>
      <section className="sequence-intro-section card">
        {" "}
        {/* Intro card */}
        <h2>What is the Euclidean Algorithm?</h2>
        <p>
          The Euclidean algorithm is an efficient method for computing the
          greatest common divisor (GCD) of two integers. It is named after the
          ancient Greek mathematician Euclid, who described it in his Elements
          (c. 300 BC).
        </p>
        <div className="algorithm-rules">
          <p>The algorithm is based on the following principles:</p>
          <ol>
            <li>
              If <code>A = 0</code> then <code>GCD(A,B) = B</code>. If{" "}
              <code>B = 0</code> then <code>GCD(A,B) = A</code>.
            </li>
            <li>
              Write <code>A = B*Q + R</code> where <code>Q</code> is the
              quotient and <code>R</code> is the remainder.
            </li>
            <li>
              Then <code>GCD(A,B) = GCD(B,R)</code>.
            </li>
          </ol>
          <p>
            The algorithm proceeds by successive divisions, using the remainder
            of each step as the divisor in the next step, until the remainder
            becomes zero. The last non-zero remainder is the GCD.
          </p>
        </div>
      </section>
      <section className="sequence-generator-section card">
        {" "}
        {/* Generator card */}
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
        <section className="results card">
          {" "}
          {/* Results card */}
          <h2>Algorithm Steps</h2>
          {gcdResult !== null && (
            <p className="gcd-result-display">
              {" "}
              Result: GCD({numA}, {numB}) = <strong>{gcdResult}</strong>
            </p>
          )}
          <div className="table-container">
            {" "}
            <table className="euclidean-table">
              <thead>
                <tr>
                  <th>Step</th>
                  <th>Dividend</th>
                  <th>Divisor</th>
                  <th>Quotient</th>
                  <th>Remainder</th>
                  <th>Equation</th>
                </tr>
              </thead>
              <tbody>
                {steps.map((step, index) => {
                  // The actual last step for GCD calculation is when step.b becomes 0 in the *next* iteration.
                  // The 'steps' array from executeEuclideanAlgorithm should give us rows where step.b is the divisor.
                  // The last row in the table will have step.remainder === 0.
                  if (step.b === 0) {
                    // This step represents GCD(a,0)=a, usually not shown as a calculation row.
                    // We'll rely on executeEuclideanAlgorithm to provide rows suitable for the table.
                    // The last row in the table should be the one where remainder becomes 0.
                    // For example, if steps are (48,18,2,12), (18,12,1,6), (12,6,2,0)
                    // All three should be displayed.
                    // The gcdResult is derived from the step where b becomes 0 (i.e. step.a of that conceptual final step)
                    // or the 'a' from the last step if it's (a,0)
                    // The table should display all calculation steps.
                    // If executeEuclideanAlgorithm includes the (GCD, 0, 0, 0) step, we might want to exclude it or handle it.
                    // For now, assume all steps in the 'steps' array are calculation steps A = B*Q + R.
                    // The last step in the table will be the one where R = 0.
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{step.a}</td>
                        <td>{step.b}</td>
                        <td>{step.quotient}</td>
                        <td>{step.remainder}</td>
                        <td>
                          {step.b !== 0
                            ? `${step.a} = ${step.quotient} × ${step.b} + ${step.remainder}`
                            : `${step.a} = GCD`}
                        </td>
                      </tr>
                    );
                  }
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{step.a}</td>
                      <td>{step.b}</td>
                      <td>{step.quotient}</td>
                      <td>{step.remainder}</td>
                      <td>{`${step.a} = ${step.quotient} × ${step.b} + ${step.remainder}`}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {gcdResult !== null && (
            <div className="explanation-section">
              <h3>Explanation:</h3>
              <p>
                The Euclidean algorithm works by repeatedly dividing the larger
                number by the smaller one (Dividend by Divisor), and then using
                its Remainder as the new Divisor in the next step (the previous
                Divisor becomes the new Dividend).
              </p>
              <p>
                The process continues until a Remainder of 0 is achieved. The
                last non-zero Remainder is the Greatest Common Divisor (GCD). In
                this case, the GCD of {numA} and {numB} is {gcdResult}.
              </p>
            </div>
          )}
        </section>
      )}
      <section className="sequence-automata-connection card">
        {" "}
        {/* Automata card */}
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
