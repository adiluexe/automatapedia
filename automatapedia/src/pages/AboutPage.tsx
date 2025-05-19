// filepath: d:\Development\automatapedia\automatapedia\src\pages\AboutPage.tsx
import React from "react";
import "./AboutPage.css";

const AboutPage: React.FC = () => {
  return (
    <div className="container about-page">
      <h1>About Automatapedia</h1>

      <section className="section">
        <h2>Project Goal</h2>
        <p>
          Automatapedia aims to be an interactive web application that
          visualizes and generates mathematical sequences related to automata
          theory. Our goal is to provide an educational and engaging tool for
          students, educators, and enthusiasts interested in automata theory,
          discrete mathematics, computer science, and the fascinating world of
          mathematical sequences and computational patterns.
        </p>
      </section>

      <section className="section">
        <h2>Target Audience</h2>
        <ul>
          <li>
            Students studying automata theory, discrete mathematics, or computer
            science.
          </li>
          <li>Educators teaching these subjects.</li>
          <li>
            Individuals interested in mathematical sequences and computational
            patterns.
          </li>
        </ul>
      </section>

      <section className="section">
        <h2>Core Features</h2>
        <p>
          The application allows users to generate and visualize various
          mathematical sequences, including:
        </p>
        <ul>
          <li>Collatz Sequence</li>
          <li>Euclidean Algorithm Steps</li>
          <li>Fibonacci Sequence</li>
          <li>Tribonacci Sequence</li>
          <li>Lucas Sequence</li>
          <li>Pascal's Triangle</li>
        </ul>
        <p>
          Each sequence comes with interactive controls, visualizations (where
          applicable), and information about its definition, properties, and
          relevance to automata theory.
        </p>
      </section>

      <section className="section">
        <h2>Design Philosophy</h2>
        <p>
          We've adopted a "Vintage with a Modern Twist" theme. This involves a
          muted color palette (aged paper, dark wood, metallic details),
          typewriter-style fonts (<code>Outfit</code> for headings,{" "}
          <code>Chivo</code> for body) for a thematic feel, and modern UI
          elements for clarity and ease of use. Smooth, subtle animations aim to
          enhance the user experience without being distracting.
        </p>
      </section>

      <section className="section">
        <h2>Technology Stack</h2>
        <p>Automatapedia is built using modern web technologies:</p>
        <ul className="tech-stack-list">
          <li>
            <strong>Frontend:</strong> React with TypeScript, HTML5, CSS3
            (Flexbox, Grid)
          </li>
          <li>
            <strong>Routing:</strong> React Router
          </li>
          <li>
            <strong>Charting:</strong> Recharts
          </li>
          <li>
            <strong>Development Tools:</strong> Vite, Git, VS Code
          </li>
        </ul>
        <p>
          The application is designed to be responsive and accessible across
          various devices.
        </p>
      </section>

      <section className="section">
        <h2>Our Team</h2>
        <p>
          This project was developed by a passionate team dedicated to making
          learning about mathematical concepts more interactive and enjoyable.
          (Further details about the team can be added here.)
        </p>
      </section>

      <section className="section">
        <h2>Future Enhancements</h2>
        <p>
          We plan to continue expanding Automatapedia with more sequences,
          enhanced visualizations, and deeper connections to computational
          theory.
        </p>
      </section>

      <section className="section">
        <h2>Acknowledgements</h2>
        <p>
          We would like to thank the open-source community for the wonderful
          tools and libraries that made this project possible.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
