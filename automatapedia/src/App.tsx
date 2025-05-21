import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; // Added Link
import { motion } from "framer-motion";
import "./index.css";
import HomePage from "./pages/HomePage";
import CollatzPage from "./pages/CollatzPage";
import FibonacciPage from "./pages/FibonacciPage";
import TribonacciPage from "./pages/TribonacciPage";
import LucasPage from "./pages/LucasPage";
import EuclideanPage from "./pages/EuclideanPage";
import PascalPage from "./pages/PascalPage";
import AboutPage from "./pages/AboutPage"; // Import the AboutPage component
import { useState, useEffect } from "react"; // Import useState and useEffect

const App: React.FC = () => {
  const [theme, setTheme] = useState(() => {
    // Get saved theme from localStorage or default to 'light'
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "light";
  });

  useEffect(() => {
    // Apply the theme to the root element
    document.documentElement.setAttribute("data-theme", theme);
    // Save the theme to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <Router>
      <div className="app-container">
        {" "}
        {/* Replaced Tailwind classes with a general one */}
        <nav className="main-nav">
          {" "}
          {/* Replaced Tailwind classes with a general one */}
          <div className="nav-content">
            {" "}
            {/* Replaced Tailwind classes with a general one */}
            <Link to="/" className="nav-logo">
              <span className="logo-automata">Automata</span>
              <span className="logo-pedia">pedia</span>
            </Link>{" "}
            {/* Added Link and class*/}
            <ul className="nav-links">
              {" "}
              {/* Added class*/}
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/collatz">Collatz</Link>
              </li>
              <li>
                <Link to="/fibonacci">Fibonacci</Link>
              </li>
              <li>
                <Link to="/tribonacci">Tribonacci</Link>
              </li>
              <li>
                <Link to="/lucas">Lucas</Link>
              </li>
              <li>
                <Link to="/euclidean">Euclidean</Link>
              </li>
              <li>
                <Link to="/pascal">Pascal</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>{" "}
              {/* Assuming an About page will be created */}
            </ul>
            <button
              onClick={toggleTheme}
              className="theme-toggle-button"
              aria-label={
                theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </div>
        </nav>
        <main className="main-content">
          {" "}
          {/* Replaced Tailwind classes with a general one */}
          <Routes>
            <Route
              path="/"
              element={
                <AnimatedPage>
                  <HomePage />
                </AnimatedPage>
              }
            />
            <Route
              path="/collatz"
              element={
                <AnimatedPage>
                  <CollatzPage />
                </AnimatedPage>
              }
            />
            <Route
              path="/fibonacci"
              element={
                <AnimatedPage>
                  <FibonacciPage />
                </AnimatedPage>
              }
            />
            <Route
              path="/tribonacci"
              element={
                <AnimatedPage>
                  <TribonacciPage />
                </AnimatedPage>
              }
            />{" "}
            {/* Added route */}
            <Route
              path="/lucas"
              element={
                <AnimatedPage>
                  <LucasPage />
                </AnimatedPage>
              }
            />{" "}
            {/* Added route */}
            <Route
              path="/euclidean"
              element={
                <AnimatedPage>
                  <EuclideanPage />
                </AnimatedPage>
              }
            />{" "}
            {/* Added route */}
            <Route
              path="/pascal"
              element={
                <AnimatedPage>
                  <PascalPage />
                </AnimatedPage>
              }
            />
            <Route
              path="/about"
              element={
                <AnimatedPage>
                  <AboutPage />
                </AnimatedPage>
              }
            />{" "}
            {/* Add routes for other pages here */}
          </Routes>
        </main>
        <footer className="main-footer">
          {" "}
          {/* Replaced Tailwind classes with a general one */}
          <p>© 2025 Automatapedia</p>
          <p>
            An interactive journey through mathematical sequences & automata
            theory
          </p>
        </footer>
      </div>
    </Router>
  );
};

// Wrapper for page animations
const AnimatedPage: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 50 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

export default App;
