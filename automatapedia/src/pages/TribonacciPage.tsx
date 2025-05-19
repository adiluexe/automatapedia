import React, { useState } from "react";
import { generateTribonacciSequence } from "../sequences/tribonacci";
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
import "./SequencePage.css"; // Using common sequence page styles

const TribonacciPage: React.FC = () => {
  // State for input fields (strings)
  const [numTermsInput, setNumTermsInput] = useState<string>("10");
  const [startVal1Input, setStartVal1Input] = useState<string>("0");
  const [startVal2Input, setStartVal2Input] = useState<string>("0");
  const [startVal3Input, setStartVal3Input] = useState<string>("1");

  // State for actual numbers used in generation
  const [numTerms, setNumTerms] = useState<number>(10);
  const [startVal1, setStartVal1] = useState<number>(0);
  const [startVal2, setStartVal2] = useState<number>(0);
  const [startVal3, setStartVal3] = useState<number>(1);

  const [sequence, setSequence] = useState<number[]>(
    generateTribonacciSequence(numTerms, startVal1, startVal2, startVal3) // Use state here for initial generation
  );
  const [showSequence, setShowSequence] = useState<boolean>(true); // Show by default
  const [error, setError] = useState<string>("");

  const handleGenerateSequence = () => {
    const terms = parseInt(numTermsInput, 10);
    const val1 = parseInt(startVal1Input, 10);
    const val2 = parseInt(startVal2Input, 10);
    const val3 = parseInt(startVal3Input, 10);

    if (isNaN(terms) || terms <= 0) {
      setError("Number of terms must be a positive integer.");
      setSequence([]);
      setShowSequence(false);
      return;
    }
    if (isNaN(val1) || isNaN(val2) || isNaN(val3)) {
      setError("Starting values must be integers.");
      setSequence([]);
      setShowSequence(false);
      return;
    }
    if (terms > 50) {
      // Limit for practical display
      setError("Please enter a number of terms less than or equal to 50.");
      setSequence([]);
      setShowSequence(false);
      return;
    }

    setError("");
    setNumTerms(terms);
    setStartVal1(val1);
    setStartVal2(val2);
    setStartVal3(val3);
    setSequence(generateTribonacciSequence(terms, val1, val2, val3));
    setShowSequence(true);
  };

  const chartData = sequence.map((value, index) => ({ term: index, value }));

  return (
    <div className="container sequence-page">
      <header className="sequence-header">
        <h1>Tribonacci Sequence</h1>
        <p className="sequence-intro">
          The Tribonacci sequence is a generalization of the Fibonacci sequence
          where each term is the sum of the three preceding terms. The standard
          sequence starts with <code>T(0) = 0</code>, <code>T(1) = 0</code>, and{" "}
          <code>T(2) = 1</code>. Explore how changing the number of terms or the
          initial values affects the sequence.
        </p>
      </header>

      <section className="interactive-generator">
        <h2>Generate Sequence</h2>
        <div className="input-grid tribonacci-grid">
          <label htmlFor="numTerms">Number of terms:</label>
          <input
            type="number"
            id="numTerms"
            value={numTermsInput}
            onChange={(e) => {
              setNumTermsInput(e.target.value);
              setShowSequence(false);
            }}
            min="1"
            max="50"
          />
          <label htmlFor="startVal1">First term (T0):</label>
          <input
            type="number"
            id="startVal1"
            value={startVal1Input}
            onChange={(e) => {
              setStartVal1Input(e.target.value);
              setShowSequence(false);
            }}
          />
          <label htmlFor="startVal2">Second term (T1):</label>
          <input
            type="number"
            id="startVal2"
            value={startVal2Input}
            onChange={(e) => {
              setStartVal2Input(e.target.value);
              setShowSequence(false);
            }}
          />
          <label htmlFor="startVal3">Third term (T2):</label>
          <input
            type="number"
            id="startVal3"
            value={startVal3Input}
            onChange={(e) => {
              setStartVal3Input(e.target.value);
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
            Generated {numTerms} terms of the Tribonacci sequence{" "}
            {/* Use numTerms state here */}
            starting with <code>{startVal1}</code>, <code>{startVal2}</code>,{" "}
            <code>{startVal3}</code>.
          </p>
          <div className="visualization-placeholder chart-container">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
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
                  name="Value T(n)"
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
                  name="Tribonacci Value"
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
                  T({index}) = {num}
                  {index < sequence.length - 1 ? ", " : ""}
                </code>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="sequence-info">
        <h2>About the Tribonacci Sequence</h2>
        <p>
          A Tribonacci number is a member of a sequence of integers in which
          each term is the sum of the three preceding terms. The sequence can be
          defined by the recurrence relation:
        </p>
        <p>
          <code>T(n) = T(n-1) + T(n-2) + T(n-3)</code>
        </p>
        <p>
          With initial values typically set as <code>T(0) = 0</code>,{" "}
          <code>T(1) = 0</code>, and <code>T(2) = 1</code>. Other starting
          values can also be used to generate different Tribonacci-like
          sequences.
        </p>
        <h3>Connection to Automata Theory</h3>
        <p>
          While direct connections of the Tribonacci sequence to automata theory
          might be less prominent than for sequences like Fibonacci (e.g., in
          counting paths in certain graphs representable by automata), number
          sequences defined by linear recurrences can appear in the analysis of
          formal languages and automata. For instance, the number of words of a
          certain length accepted by a specific type of automaton or generated
          by a grammar could follow such a recurrence. The study of growth rates
          of languages, often related to these sequences, is a key aspect of
          automata theory.
        </p>
        <p>
          Further exploration might involve constructing automata whose state
          transitions or accepted words relate to Tribonacci numbers, perhaps in
          combinatorial contexts or in analyzing the complexity of algorithms
          related to these sequences.
        </p>
      </section>
    </div>
  );
};

export default TribonacciPage;
