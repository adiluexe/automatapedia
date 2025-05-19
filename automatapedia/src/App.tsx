import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion
import CollatzPage from "./pages/CollatzPage";
import EuclideanPage from "./pages/EuclideanPage";
import FibonacciPage from "./pages/FibonacciPage";
import LucasPage from "./pages/LucasPage";
import PascalPage from "./pages/PascalPage";
import TribonacciPage from "./pages/TribonacciPage";
import "./App.css";
import "./index.css"; // Ensure global styles are imported

const App: React.FC = () => {
  return (
    <Router>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Automatapedia</Link>
            </li>{" "}
            {/* Added Home/Brand Link */}
            <li>
              <Link to="/collatz">Collatz</Link>
            </li>
            <li>
              <Link to="/euclidean">Euclidean</Link>
            </li>
            <li>
              <Link to="/fibonacci">Fibonacci</Link>
            </li>
            <li>
              <Link to="/lucas">Lucas</Link>
            </li>
            <li>
              <Link to="/pascal">Pascal's Triangle</Link>
            </li>
            <li>
              <Link to="/tribonacci">Tribonacci</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="page-container">
        {" "}
        {/* Added page-container for consistent padding/width */}
        <Routes>
          {/* Basic Home Page for now */}
          <Route path="/" element={<HomePage />} />
          <Route
            path="/collatz"
            element={
              <AnimatedPage>
                <CollatzPage />
              </AnimatedPage>
            }
          />
          <Route
            path="/euclidean"
            element={
              <AnimatedPage>
                <EuclideanPage />
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
            path="/lucas"
            element={
              <AnimatedPage>
                <LucasPage />
              </AnimatedPage>
            }
          />
          <Route
            path="/pascal"
            element={
              <AnimatedPage>
                <PascalPage />
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
          />
        </Routes>
      </main>
    </Router>
  );
};

// Simple Home Page Component
const HomePage: React.FC = () => (
  <motion.div
    className="container"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h1>Welcome to Automatapedia!</h1>
    <p style={{ textAlign: "center", fontSize: "1.2em" }}>
      Explore mathematical sequences and algorithms with interactive
      visualizations. Select a sequence from the navigation bar to get started.
    </p>
  </motion.div>
);

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
