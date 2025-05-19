// filepath: d:\Development\automatapedia\automatapedia\src\pages\AboutPage.tsx
import React from "react";
import { Link } from "react-router-dom";
import "./AboutPage.css";

const AboutPage: React.FC = () => {
  return (
    <div className="about-page-container">
      <header className="about-page-header">
        <h1>About Automatapedia</h1>
      </header>

      <div className="card">
        <h2>About Automatapedia</h2>
        <p>
          Automatapedia is an interactive web application that visualizes and
          generates mathematical sequences related to automata theory. It
          provides an educational and engaging tool for students, educators, and
          enthusiasts interested in mathematical sequences and computational
          patterns.
        </p>
        <p>
          With a distinctive vintage aesthetic, Automatapedia brings together
          the beauty of mathematics and the charm of early computing, creating a
          unique learning experience that's both informative and visually
          engaging.
        </p>
      </div>

      <div className="card">
        <h2>What is Automata Theory?</h2>
        <p>
          Automata theory is a branch of theoretical computer science and
          mathematics that studies abstract machines and the computational
          problems that can be solved using these machines. The word "automaton"
          (plural: automata) comes from the Greek word αὐτόματον meaning
          "self-acting".
        </p>
        <p>
          At its core, automata theory provides mathematical models of
          computation, helping us understand the capabilities and limitations of
          different types of computational systems. These models range from
          simple finite automata to complex Turing machines.
        </p>
        <p>
          The mathematical sequences and patterns explored in Automatapedia have
          deep connections to automata theory, demonstrating how complex
          behaviors can emerge from simple rules—a fundamental concept in
          computational systems.
        </p>
      </div>

      <div className="card">
        <h2>Available Sequences</h2>
        <p>Currently, Automatapedia features the following sequences:</p>
        <ul className="available-sequences-list">
          <li>
            <Link to="/collatz">Collatz Sequence</Link> – A sequence defined by
            repeatedly applying the 3n+1 rule to a starting number.
          </li>
          <li>
            <Link to="/fibonacci">Fibonacci Sequence</Link> – A sequence where
            each number is the sum of the two preceding ones.
          </li>
          <li>
            <Link to="/tribonacci">Tribonacci Sequence</Link> – A sequence where
            each number is the sum of the three preceding ones.
          </li>
          <li>
            <Link to="/lucas">Lucas Sequence</Link> – A sequence related to the
            Fibonacci sequence, defined by a similar recurrence relation.
          </li>
          <li>
            <Link to="/euclidean">Euclidean Algorithm</Link> – A step-by-step
            method for finding the greatest common divisor (GCD) of two
            integers.
          </li>
          <li>
            <Link to="/pascal">Pascal's Triangle</Link> – A triangular array of
            binomial coefficients with many fascinating properties.
          </li>
        </ul>
      </div>

      <div className="card glossary-card">
        <h2>Glossary of Terms</h2>
        <dl className="glossary-terms">
          <dt>Algorithm</dt>
          <dd>A step-by-step procedure or formula for solving a problem.</dd>

          <dt>Automaton</dt>
          <dd>
            An abstract self-propelled computing device which follows a
            predetermined sequence of operations automatically.
          </dd>

          <dt>Binomial Coefficient</dt>
          <dd>
            The coefficients of the terms in the expansion of a binomial power
            (e.g., (x + y)^n). They form the entries of Pascal's Triangle.
          </dd>

          <dt>Collatz Conjecture (3n+1 Problem)</dt>
          <dd>
            A conjecture in mathematics that states that if you pick a number,
            and if it's even divide it by two and if it's odd multiply it by
            three and add one, you will eventually reach one.
          </dd>

          <dt>Computation</dt>
          <dd>
            Any type of calculation or use of computing technology. Automata
            theory provides formal models of computation.
          </dd>

          <dt>Euclidean Algorithm</dt>
          <dd>
            An efficient method for computing the greatest common divisor (GCD)
            of two integers.
          </dd>

          <dt>Fibonacci Sequence</dt>
          <dd>
            A sequence in which each number is the sum of the two preceding
            ones, usually starting with 0 and 1.
          </dd>

          <dt>Finite Automaton (FA)</dt>
          <dd>
            A model of computation consisting of a finite number of states and
            transitions between those states in response to input. It can be
            used to recognize regular languages.
          </dd>

          <dt>Formal Language</dt>
          <dd>
            A set of strings of symbols that are constrained by rules. In
            automata theory, languages are often defined by the automata that
            can recognize them.
          </dd>

          <dt>Generation (Sequence Generation)</dt>
          <dd>
            The process of producing the terms of a sequence according to a
            defined rule or formula.
          </dd>

          <dt>Greatest Common Divisor (GCD)</dt>
          <dd>
            The largest positive integer that divides two or more integers
            without a remainder. The Euclidean algorithm is a common method for
            finding the GCD.
          </dd>

          <dt>Lucas Sequence</dt>
          <dd>
            A sequence related to the Fibonacci sequence, defined by the same
            recurrence relation but with different initial values (typically
            L0=2, L1=1).
          </dd>

          <dt>Pascal's Triangle</dt>
          <dd>
            A triangular array of binomial coefficients, where each number is
            the sum of the two directly above it.
          </dd>

          <dt>Recurrence Relation</dt>
          <dd>
            An equation that recursively defines a sequence where each term is
            defined as a function of the preceding terms.
          </dd>

          <dt>Regular Language</dt>
          <dd>
            A formal language that can be recognized by a finite automaton.
            These languages can be described by regular expressions.
          </dd>

          <dt>Sequence</dt>
          <dd>
            An enumerated collection of objects in which repetitions are allowed
            and order matters.
          </dd>

          <dt>State</dt>
          <dd>
            A configuration of information in a system; in automata theory,
            states represent different conditions of the automaton.
          </dd>

          <dt>Transition</dt>
          <dd>
            In automata theory, a change from one state to another, typically
            triggered by an input symbol.
          </dd>

          <dt>Tribonacci Sequence</dt>
          <dd>
            A sequence in which each number is the sum of the three preceding
            ones.
          </dd>

          <dt>Turing Machine</dt>
          <dd>
            A mathematical model of computation that defines an abstract machine
            which manipulates symbols on a strip of tape according to a table of
            rules. Despite its simplicity, a Turing machine can simulate any
            computer algorithm.
          </dd>

          <dt>Visualization</dt>
          <dd>
            The graphical representation of data or concepts, used in
            Automatapedia to illustrate mathematical sequences and algorithmic
            steps.
          </dd>
        </dl>
      </div>

      <div className="card">
        <h2>The Team</h2>
        <p>Automatapedia was created by:</p>
        <ul>
          <li>Exequel Adizon</li>
          <li>David Olimberio</li>
          <li>Michael Josh Bargabino</li>
        </ul>
        <p>
          This project was developed with the assistance of AI, aiming to build
          a high-quality educational tool.
        </p>
      </div>

      <div className="card">
        <h2>Technology Stack</h2>
        <p>
          Automatapedia is built with modern web technologies, focusing on a
          responsive and interactive user experience:
        </p>
        <ul>
          <li>
            <strong>Frontend:</strong> React, TypeScript, HTML, CSS
          </li>
          <li>
            <strong>Routing:</strong> React Router
          </li>
          <li>
            <strong>Animations:</strong> Framer Motion
          </li>
          <li>
            <strong>Styling:</strong> Custom CSS (Chivo Mono for headings, Chivo
            for body)
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AboutPage;
