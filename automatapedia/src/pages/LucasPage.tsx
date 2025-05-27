import React, { useState } from "react";
import { generateLucasSequence } from "../sequences/lucas";
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
import "./SequencePage.css"; // Common styles for sequence pages

const LucasPage: React.FC = () => {
  const [numTermsInput, setNumTermsInput] = useState<string>("10"); // Input state as string
  const [numTerms, setNumTerms] = useState<number>(10); // Parsed number state
  const [sequence, setSequence] = useState<number[]>(generateLucasSequence(10));
  const [showSequence, setShowSequence] = useState<boolean>(true); // Show by default
  const [error, setError] = useState<string>("");

  const handleGenerateSequence = () => {
    const terms = parseInt(numTermsInput, 10);
    if (isNaN(terms) || terms < 3) {
      // Updated condition
      setError(
        "Number of terms must be an integer greater than or equal to 3."
      ); // Updated error message
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
    setSequence(generateLucasSequence(terms));
    setShowSequence(true);
  };

  const handleNumTermsInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNumTermsInput(event.target.value);
    setShowSequence(false); // Hide sequence when input changes
  };

  const chartData = sequence.map((value, index) => ({ term: index, value }));

  return (
    <div className="sequence-page-container">
      {" "}
      {/* Changed from "container sequence-page" */}
      <header className="sequence-page-header">
        {" "}
        {/* Added header */}
        <h1>Lucas Sequence</h1>
      </header>
      <section className="sequence-intro-section card">
        {" "}
        {/* Intro card */}
        <h2>What is the Lucas Sequence?</h2>
        <p>
          The Lucas sequence is a sequence of integers closely related to the
          Fibonacci sequence. It follows the same recurrence relation (each term
          is the sum of the two preceding ones), but with different starting
          values: <code>L(0) = 2</code> and <code>L(1) = 1</code>. The first few
          terms are: 2, 1, 3, 4, 7, 11, 18, 29, 47, 76, 123, ...
        </p>
        <h4>Mathematical Properties</h4>
        <ul>
          <li>
            The ratio of consecutive Lucas numbers converges to the golden ratio
            (approximately 1.618).
          </li>
          <li>
            Lucas numbers are related to Fibonacci numbers by the identity:{` `}
            <code>L(n) = F(n-1) + F(n+1)</code>.
          </li>
          <li>
            The sum of the first n Lucas numbers is <code>L(n+2) - 3</code>.
          </li>
          <li>
            Lucas numbers appear in various combinatorial problems and number
            theory.
          </li>
        </ul>
        <p>
          The Lucas sequence demonstrates how simple recurrence relations can
          produce numbers with rich mathematical properties and connections to
          other sequences.
        </p>
      </section>
      <section className="sequence-generator-section card">
        {" "}
        {/* Generator card */}
        <h2>Generate Lucas Sequence</h2>
        <div className="input-grid">
          <label htmlFor="numTerms">Number of Terms:</label>
          <input
            type="number"
            id="numTerms"
            value={numTermsInput} // Bind to string input state
            onChange={handleNumTermsInputChange}
            min="3" // Updated min attribute
            max="50"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button onClick={handleGenerateSequence} className="generate-button">
          Generate
        </button>
      </section>
      {showSequence && sequence.length > 0 && (
        <section className="results card">
          {" "}
          {/* Results card */}
          <h2>Results</h2> {/* Changed from Results: */}
          <p>Generated {numTerms} terms of the Lucas sequence.</p>{" "}
          {/* Use numTerms state */}
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
                  name="Value L(n)"
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
                  formatter={(value: number) => value.toLocaleString()}
                />
                <Legend wrapperStyle={{ color: "var(--text-color)" }} />
                <Line
                  type="monotone"
                  dataKey="value"
                  name="Lucas Value"
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
                  L({index}) = {num}
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
          Similar to Fibonacci numbers, Lucas numbers can appear in the context
          of automata theory, particularly in the analysis of the number of
          words of a certain length accepted by specific finite automata or
          generated by certain grammars. The underlying linear recurrence
          relation is common in such combinatorial enumerations. For example,
          counting paths in specific graph structures that can be modeled by
          automata might lead to Lucas numbers or related sequences. Their
          properties, like the connection to the golden ratio, also tie into the
          study of the growth rates of formal languages.
        </p>
      </section>
    </div>
  );
};

export default LucasPage;
