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

    if (isNaN(terms) || terms <= 2) {
      setError("Number of terms must be an integer greater than 2.");
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
    <div className="sequence-page-container">
      {" "}
      {/* Changed from "container sequence-page" */}
      <header className="sequence-page-header">
        {" "}
        {/* Added header */}
        <h1>Fibonacci Sequence</h1>
      </header>
      <section className="sequence-intro-section card">
        {" "}
        {/* Intro card */}
        <h2>What is the Fibonacci Sequence?</h2>
        <p>
          The Fibonacci sequence is a series of numbers where each number is the
          sum of the two preceding ones, usually starting with 0 and 1. That is,{" "}
          <code>F(0) = 0</code>, <code>F(1) = 1</code>, and{" "}
          <code>F(n) = F(n-1) + F(n-2)</code> for <code>n &gt; 1</code>.
        </p>
        <p>
          The Fibonacci sequence is named after Leonardo of Pisa, known as
          Fibonacci, who introduced the sequence to Western European mathematics
          in his 1202 book Liber Abaci.
        </p>
        <p>
          It appears in many areas of mathematics and nature, such as the
          branching of trees, the arrangement of leaves on a stem, the fruit
          sprouts of a pineapple, the flowering of artichoke, an uncurling fern
          and the arrangement of a pine cone's bracts.
        </p>
      </section>
      <section className="sequence-generator-section card">
        {" "}
        {/* Generator card */}
        <h2>Generate Fibonacci Sequence</h2>
        <div className="input-grid">
          <label htmlFor="numTerms">Number of terms:</label>
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
      {/* Removed card wrapper from here */}
      {showSequence && sequence.length > 0 && (
        <section className="results card">
          {" "}
          {/* Results card */}
          <h2>Results</h2>
          <p>
            Generated {sequence.length} terms of the Fibonacci sequence starting
            with F(0) = {firstTerm} and F(1) = {secondTerm}.
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
      <section className="sequence-automata-connection card">
        {" "}
        {/* Automata card */}
        <h2>Connection to Automata Theory</h2>
        <p>
          Fibonacci numbers appear in the analysis of certain types of automata
          and formal languages. For example, the number of binary strings of
          length <code>n</code> that do not contain two consecutive 1s is given
          by the Fibonacci number <code>F(n+2)</code>. This can be shown by
          constructing a finite automaton that accepts such strings. The study
          of growth functions of languages, which count the number of words of a
          given length, often involves sequences like Fibonacci.
        </p>
      </section>
      {/* Removed card wrapper from here */}
    </div>
  );
};

export default FibonacciPage;
