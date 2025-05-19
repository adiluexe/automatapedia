import React, { useState } from "react";
import { generateCollatzSequence } from "../sequences/collatz";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../App.css"; // General app styles
import "./SequencePage.css"; // Specific styles for sequence pages

const CollatzPage: React.FC = () => {
  const [startNumber, setStartNumber] = useState<number>(17); // Default to 17 as in image
  const [sequence, setSequence] = useState<number[]>(
    generateCollatzSequence(17)
  );
  const [showSequence, setShowSequence] = useState<boolean>(true); // Show by default
  const [error, setError] = useState<string>("");

  const handleGenerateSequence = () => {
    if (startNumber <= 0) {
      setError("Please enter a positive starting number.");
      setSequence([]);
      setShowSequence(false);
      return;
    }
    if (startNumber > 1000000) {
      // Add a reasonable upper limit for performance
      setError(
        "Starting number is too large. Please choose a smaller number (e.g., below 1,000,000)."
      );
      setSequence([]);
      setShowSequence(false);
      return;
    }
    setError("");
    const newSequence = generateCollatzSequence(startNumber);
    setSequence(newSequence);
    setShowSequence(true);
  };

  const handleStartNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value, 10);
    setStartNumber(isNaN(value) ? 0 : value);
    setShowSequence(false); // Hide sequence when input changes
  };

  const sequenceSteps = sequence.length > 0 ? sequence.length - 1 : 0;

  const chartData = sequence.map((value, index) => ({ step: index, value }));

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
            value={startNumber}
            onChange={handleStartNumberChange}
            min="1"
          />
          <button onClick={handleGenerateSequence} className="generate-button">
            Generate
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </section>

      {showSequence && sequence.length > 0 && (
        <section className="results card">
          <h2>Results</h2>
          <p>
            Starting from {startNumber}, the sequence reached 1 in{" "}
            {sequenceSteps} step{sequenceSteps !== 1 ? "s" : ""}.
          </p>

          <div className="visualization-placeholder chart-container">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border-color)"
                />
                <XAxis dataKey="step" stroke="var(--text-color)" />
                <YAxis stroke="var(--text-color)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--background-color-light)",
                    borderColor: "var(--border-color)",
                  }}
                  itemStyle={{ color: "var(--text-color)" }}
                />
                <Legend wrapperStyle={{ color: "var(--text-color)" }} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="var(--primary-color)"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
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
        </section>
      )}
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
