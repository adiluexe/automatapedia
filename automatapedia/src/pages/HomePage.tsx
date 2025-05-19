import React from "react";
import { Link } from "react-router-dom";

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
  <div className="bg-white shadow-lg rounded-lg p-6 border border-secondary transform hover:scale-105 transition-transform duration-300">
    <h3 className="font-heading text-xl text-primary mb-2">{title}</h3>
    <div className="w-full h-32 bg-gray-200 mb-4 rounded flex items-center justify-center text-gray-400">
      {/* Placeholder for visualization/image */}
      <span>Visualization Area</span>
    </div>
    <p className="text-text mb-4 text-sm">{description}</p>
    <Link
      to={linkTo}
      className="inline-block bg-primary text-white font-body px-6 py-2 rounded hover:bg-accent transition-colors duration-300"
    >
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
    <div className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="font-heading text-6xl text-primary mb-4">
          Automatapedia
        </h1>
        <p className="text-xl text-text mb-8">
          An interactive journey through mathematical sequences and automata
          theory
        </p>
      </section>

      {/* Welcome Section */}
      <section className="mb-16 p-8 bg-white shadow-lg rounded-lg border border-secondary">
        <h2 className="font-heading text-3xl text-primary mb-4">
          Welcome to Automatapedia
        </h2>
        <p className="text-text mb-4">
          Automatapedia is an interactive encyclopedia of mathematical sequences
          related to automata theory. Explore the fascinating patterns behind
          computation and mathematics with our vintage-inspired visualizations.
        </p>
        <p className="text-text">
          Select a sequence below to begin your exploration, or visit our{" "}
          <Link to="/about" className="text-accent hover:underline">
            About page
          </Link>{" "}
          to learn more about the project.
        </p>
      </section>

      {/* Explore Sequences Section */}
      <section>
        <h2 className="font-heading text-4xl text-primary text-center mb-10">
          Explore Sequences
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
