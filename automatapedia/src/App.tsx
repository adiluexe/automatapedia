import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; // Added Link
import { motion } from "framer-motion";
import "./index.css";
import HomePage from "./pages/HomePage";
import CollatzPage from "./pages/CollatzPage";
import FibonacciPage from "./pages/FibonacciPage";
import TribonacciPage from "./pages/TribonacciPage";
import LucasPage from "./pages/LucasPage"; // Added import
import PascalPage from "./pages/PascalPage";
// Import other pages if they exist

const App: React.FC = () => {
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
              Automatapedia
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
              path="/pascal"
              element={
                <AnimatedPage>
                  <PascalPage />
                </AnimatedPage>
              }
            />
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
