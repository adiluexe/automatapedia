import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css"; // Import the CSS file for HomePage

// Placeholder for SequenceCard component
const SequenceCard = ({
  title,
  description,
  linkTo,
  imageUrl, // Added imageUrl prop
}: {
  title: string;
  description: string;
  linkTo: string;
  imageUrl: string; // Added imageUrl type
}) => (
  <div className="sequence-card">
    <h3>{title}</h3>
    <div className="visualization-area">
      {/* Added image tag */}
      <img
        src={imageUrl}
        alt={`${title} visualization`}
        className="sequence-image"
      />
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
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/7/75/Lothar_Collatz.jpg",
    },
    {
      title: "Fibonacci Sequence",
      description:
        "Generate and visualize the Fibonacci sequence, where each number is the sum of the two preceding ones.",
      linkTo: "/fibonacci",
      imageUrl:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.nea-acropoli-athens.gr%2Fimages%2Fstories%2Fbiografies%2Fnea-acropoli-Leonardo-Pisano-Fibonacci.jpg&f=1&nofb=1&ipt=d4a8a2163c7523924dbe78519d7ef64f47e7ed1d3c3a924116ce4c1fdde35c72",
    },
    {
      title: "Tribonacci Sequence",
      description:
        "Discover the Tribonacci sequence, where each term is the sum of the three preceding ones.",
      linkTo: "/tribonacci",
      imageUrl:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.researchgate.net%2Fpublication%2F251504934%2Ffigure%2Ffig3%2FAS%3A392827608551430%401470668808288%2FThe-tribonacci-fractal-Partition-J-standard-tribonacci-before-and-after-exchange.png&f=1&nofb=1&ipt=f1fbbe249c531b73825dd29842569b98898b28800e4743062ff4ca6195a3f3df", // Placeholder
    },
    {
      title: "Lucas Sequence",
      description:
        "Explore the Lucas sequence, related to Fibonacci but starting with 2 and 1.",
      linkTo: "/lucas",
      imageUrl:
        "https://mathshistory.st-andrews.ac.uk/Biographies/Lucas/Lucas.jpeg",
    },
    {
      title: "Euclidean Algorithm",
      description:
        "Calculate the greatest common divisor (GCD) of two numbers using the ancient Euclidean algorithm.",
      linkTo: "/euclidean",
      imageUrl: "https://www.thefamouspeople.com/profiles/images/euclid-5.jpg",
    },
    {
      title: "Pascal's Triangle",
      description:
        "Discover the mathematical beauty of Pascal's Triangle and its many fascinating properties.",
      linkTo: "/pascal",
      imageUrl:
        "https://facts.net/wp-content/uploads/2023/09/10-mind-blowing-facts-about-blaise-pascal-1695912489.jpg",
    },
  ];

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>
          <span className="typing-text">Automatapedia</span>
        </h1>
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
              imageUrl={seq.imageUrl} // Pass imageUrl to SequenceCard
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
