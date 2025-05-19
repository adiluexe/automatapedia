import React, { useState } from "react";
import { generateTribonacciSequence } from "../sequences/tribonacci";
import "./SequencePage.css"; // Using common sequence page styles

const TribonacciPage: React.FC = () => {
  const [numTerms, setNumTerms] = useState<number>(10);
  const [startVal1, setStartVal1] = useState<number>(0);
  const [startVal2, setStartVal2] = useState<number>(0);
  const [startVal3, setStartVal3] = useState<number>(1);
  const [sequence, setSequence] = useState<number[]>(
    generateTribonacciSequence(10, 0, 0, 1)
  );
  const [showSequence, setShowSequence] = useState<boolean>(false);

  const handleGenerateSequence = () => {
    if (numTerms > 0) {
      setSequence(
        generateTribonacciSequence(numTerms, startVal1, startVal2, startVal3)
      );
      setShowSequence(true);
    } else {
      setSequence([]);
      setShowSequence(false);
    }
  };

  const handleNumTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setNumTerms(isNaN(value) || value <= 0 ? 0 : value);
    setShowSequence(false);
  };

  const handleStartVal1Change = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value, 10);
    setStartVal1(isNaN(value) ? 0 : value);
    setShowSequence(false);
  };

  const handleStartVal2Change = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value, 10);
    setStartVal2(isNaN(value) ? 0 : value);
    setShowSequence(false);
  };

  const handleStartVal3Change = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value, 10);
    setStartVal3(isNaN(value) ? 0 : value);
    setShowSequence(false);
  };

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
            value={numTerms === 0 ? "" : numTerms}
            onChange={handleNumTermsChange}
            min="1"
          />
          <label htmlFor="startVal1">First term (T0):</label>
          <input
            type="number"
            id="startVal1"
            value={startVal1}
            onChange={handleStartVal1Change}
          />
          <label htmlFor="startVal2">Second term (T1):</label>
          <input
            type="number"
            id="startVal2"
            value={startVal2}
            onChange={handleStartVal2Change}
          />
          <label htmlFor="startVal3">Third term (T2):</label>
          <input
            type="number"
            id="startVal3"
            value={startVal3}
            onChange={handleStartVal3Change}
          />
        </div>
        <button onClick={handleGenerateSequence} className="generate-button">
          Generate
        </button>
      </section>

      {showSequence && sequence.length > 0 && (
        <section className="results">
          <h2>Results</h2>
          <p>
            Generated {sequence.length} terms of the Tribonacci sequence
            starting with <code>{startVal1}</code>, <code>{startVal2}</code>,{" "}
            <code>{startVal3}</code>.
          </p>
          <div className="visualization-placeholder">
            {/* Placeholder for chart visualization */}
            <p>(Chart/Visualization Area for Tribonacci Sequence)</p>
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
