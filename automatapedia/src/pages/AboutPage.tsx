// filepath: d:\Development\automatapedia\automatapedia\src\pages\AboutPage.tsx
import React from "react";
import "./AboutPage.css";

const AboutPage: React.FC = () => {
  return (
    <div className="about-page-container">
      <header className="about-page-header">
        <h1>About Automatapedia</h1>
      </header>

      <div className="card">
        <h2>Project Overview</h2>
        <p>
          Automatapedia is an interactive web application designed to visualize
          and generate mathematical sequences related to automata theory. Our
          goal is to provide an educational and engaging tool for students,
          educators, and enthusiasts interested in automata theory, discrete
          mathematics, computer science, mathematical sequences, and
          computational patterns.
        </p>
      </div>

      <div className="card">
        <h2>Our Mission</h2>
        <p>
          We aim to make complex mathematical concepts more accessible and
          understandable through interactive visualizations and clear
          explanations. Automatapedia strives to be a valuable resource for
          learning and exploring the fascinating world of sequences and their
          connections to computational thinking.
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
            <strong>Styling:</strong> Custom CSS (No UI libraries/frameworks)
          </li>
        </ul>
        <p>
          The design philosophy incorporates a "Vintage with a Modern Twist,"
          utilizing a muted color palette, typewriter-style fonts (Outfit for
          headings, Chivo for body text), and subtle animations to create a
          unique aesthetic.
        </p>
      </div>

      <div className="card">
        <h2>The Team</h2>
        <p>
          Automatapedia was developed by a passionate team of developers and
          designers (with the assistance of AI) dedicated to creating
          high-quality educational tools.
        </p>
        {/* Add more details if needed */}
      </div>

      <div className="card">
        <h2>Acknowledgements</h2>
        <p>
          We would like to thank the open-source community and the creators of
          the various libraries and tools that made this project possible.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
