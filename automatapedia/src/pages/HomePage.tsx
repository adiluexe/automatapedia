import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css"; // Import the CSS file for HomePage

// Placeholder for SequenceCard component
const SequenceCard = ({
  title,
  description,
  linkTo,
}: {
  title: string;
  description: string;
  linkTo: string;
}) => (
  <div className="sequence-card">
    <h3>{title}</h3>
    <div className="visualization-area">
      <span>Visualization Area</span>
    </div>
    <p>{description}</p>
    <Link to={linkTo} className="explore-button">
      Explore
    </Link>
  </div>
);

const HomePage: React.FC = () => {
  const sequences = [
    {
      title: "Collatz Sequence",
      description:
        "Explore the famous Collatz Conjecture, also known as the 3n+1 problem, with our interactive generator.",
      linkTo: "/collatz",
    },
    {
      title: "Fibonacci Sequence",
      description:
        "Generate and visualize the Fibonacci sequence, where each number is the sum of the two preceding ones.",
      linkTo: "/fibonacci",
    },
    {
      title: "Tribonacci Sequence",
      description:
        "Discover the Tribonacci sequence, where each term is the sum of the three preceding ones.",
      linkTo: "/tribonacci",
    },
    {
      title: "Lucas Sequence",
      description:
        "Explore the Lucas sequence, related to Fibonacci but starting with 2 and 1.",
      linkTo: "/lucas",
    },
    {
      title: "Euclidean Algorithm",
      description:
        "Calculate the greatest common divisor (GCD) of two numbers using the ancient Euclidean algorithm.",
      linkTo: "/euclidean",
    },
    {
      title: "Pascal's Triangle",
      description:
        "Discover the mathematical beauty of Pascal's Triangle and its many fascinating properties.",
      linkTo: "/pascal",
    },
  ];

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>Automatapedia</h1>
        <p>
          An interactive journey through mathematical sequences and automata
          theory
        </p>
      </header>

      <section className="welcome-section">
        <h2>Welcome to Automatapedia</h2>
        <p>
          Automatapedia is an interactive encyclopedia of mathematical sequences
          related to automata theory. Explore the fascinating patterns behind
          computation and mathematics with our vintage-inspired visualizations.
        </p>
        <p>
          Select a sequence below to begin your exploration, or visit our{" "}
          <Link to="/about">About page</Link> to learn more about the project.
        </p>
      </section>

      <section className="explore-sequences-section">
        <h2>Explore Sequences</h2>
        <div className="sequences-grid">
          {sequences.map((seq) => (
            <SequenceCard
              key={seq.title}
              title={seq.title}
              description={seq.description}
              linkTo={seq.linkTo}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
