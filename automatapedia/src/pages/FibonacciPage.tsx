import React, { useState, useEffect } from "react";
import { generateFibonacciSequence } from "../sequences/fibonacci";
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

const FibonacciPage: React.FC = () => {
  // State for input fields (strings)
  const [numTermsInput, setNumTermsInput] = useState<string>("10");
  const [firstTermInput, setFirstTermInput] = useState<string>("0");
  const [secondTermInput, setSecondTermInput] = useState<string>("1");

  // State for the actual numbers used in generation (parsed from inputs)
  // These are set when 'Generate' is clicked
  const [numTerms, setNumTerms] = useState<number>(10);
  const [firstTerm, setFirstTerm] = useState<number>(0);
  const [secondTerm, setSecondTerm] = useState<number>(1);

  const [sequence, setSequence] = useState<number[]>([]);
  const [showSequence, setShowSequence] = useState<boolean>(false); // Don't show by default, generate on click
  const [error, setError] = useState<string>("");

  const handleGenerateSequence = () => {
    const terms = parseInt(numTermsInput, 10);
    const first = parseInt(firstTermInput, 10);
    const second = parseInt(secondTermInput, 10);

    if (isNaN(terms) || terms <= 0) {
      setError("Number of terms must be a positive integer.");
      setSequence([]);
      setShowSequence(false);
      return;
    }
    if (isNaN(first) || isNaN(second)) {
      setError("First and second terms must be integers.");
      setSequence([]);
      setShowSequence(false);
      return;
    }
    if (terms > 70) {
      setError(
        "Please enter a number of terms less than or equal to 70 for better visualization."
      );
      setSequence([]);
      setShowSequence(false);
      return;
    }

    setError("");
    setNumTerms(terms); // Store the parsed number of terms
    setFirstTerm(first); // Store the parsed first term
    setSecondTerm(second); // Store the parsed second term
    setSequence(generateFibonacciSequence(terms, first, second));
    setShowSequence(true);
  };

  // Generate sequence on initial load with default values
  useEffect(() => {
    setSequence(generateFibonacciSequence(numTerms, firstTerm, secondTerm));
    setShowSequence(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount with initial numTerms, firstTerm, secondTerm

  const chartData = sequence.map((value, index) => ({ term: index, value }));

  return (
    <div className="container sequence-page">
      <header className="sequence-header">
        <h1>Fibonacci Sequence</h1>
        <p className="sequence-intro">
          The Fibonacci sequence is a series of numbers where each number is the
          sum of the two preceding ones, usually starting with 0 and 1.
        </p>
      </header>

      <section className="interactive-generator">
        <h2>Generate Sequence</h2>
        <div className="input-grid">
          <label htmlFor="numTerms">Number of Terms:</label>
          <input
            type="number"
            id="numTerms"
            value={numTermsInput}
            onChange={(e) => {
              setNumTermsInput(e.target.value);
              setShowSequence(false); // Hide results when input changes
            }}
            min="1"
            max="70"
          />
          <label htmlFor="firstTerm">First Term (F0):</label>
          <input
            type="number"
            id="firstTerm"
            value={firstTermInput}
            onChange={(e) => {
              setFirstTermInput(e.target.value);
              setShowSequence(false);
            }}
          />
          <label htmlFor="secondTerm">Second Term (F1):</label>
          <input
            type="number"
            id="secondTerm"
            value={secondTermInput}
            onChange={(e) => {
              setSecondTermInput(e.target.value);
              setShowSequence(false);
            }}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button onClick={handleGenerateSequence} className="generate-button">
          Generate
        </button>
      </section>

      {showSequence && sequence.length > 0 && (
        <section className="results">
          <h2>Results</h2>
          <p>
            Generated {sequence.length} terms of the Fibonacci sequence starting
            with F(0) = {firstTerm}, F(1) = {secondTerm}.
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
                <XAxis
                  dataKey="term"
                  name="Term (n)"
                  stroke="var(--text-color)"
                />
                <YAxis
                  name="Value F(n)"
                  stroke="var(--text-color)"
                  allowDataOverflow={true}
                  domain={["auto", "auto"]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--background-color-light)",
                    borderColor: "var(--border-color)",
                  }}
                  itemStyle={{ color: "var(--text-color)" }}
                  formatter={(value: number) => value.toLocaleString()} // Format large numbers
                />
                <Legend wrapperStyle={{ color: "var(--text-color)" }} />
                <Line
                  type="monotone"
                  dataKey="value"
                  name="Fibonacci Value"
                  stroke="var(--primary-color)"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="sequence-values">
            <h3>Sequence Values:</h3>
            <div className="sequence-list">
              {sequence.map((num, index) => (
                <code key={index} className="sequence-element">
                  F({index}) = {num.toLocaleString()}
                  {index < sequence.length - 1 ? ", " : ""}
                </code>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="sequence-info">
        <h2>About the Fibonacci Sequence</h2>
        <p>
          The Fibonacci sequence is defined by the recurrence relation:
          <code>F(n) = F(n-1) + F(n-2)</code> with seed values typically
          <code>F(0) = 0</code> and <code>F(1) = 1</code>.
        </p>
        <h3>Connection to Automata Theory</h3>
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
