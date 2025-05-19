import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion
import HomePage from "./pages/HomePage";
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
      <div className="flex flex-col min-h-screen bg-background text-text font-body">
        {/* Header component will go here */}
        <nav className="bg-background shadow-md">
          <div className="container mx-auto px-6 py-3 flex justify-between items-center">
            <Link to="/" className="font-heading text-2xl text-primary">
              Automatapedia
            </Link>
            <div>
              <Link to="/" className="text-text hover:text-primary px-3 py-2">
                Home
              </Link>
              <Link
                to="/collatz"
                className="text-text hover:text-primary px-3 py-2"
              >
                Collatz
              </Link>
              <Link
                to="/euclidean"
                className="text-text hover:text-primary px-3 py-2"
              >
                Euclidean
              </Link>
              <Link
                to="/fibonacci"
                className="text-text hover:text-primary px-3 py-2"
              >
                Fibonacci
              </Link>
              <Link
                to="/lucas"
                className="text-text hover:text-primary px-3 py-2"
              >
                Lucas
              </Link>
              <Link
                to="/pascal"
                className="text-text hover:text-primary px-3 py-2"
              >
                Pascal
              </Link>
              <Link
                to="/tribonacci"
                className="text-text hover:text-primary px-3 py-2"
              >
                Tribonacci
              </Link>
              <Link
                to="/about" // Added About link
                className="text-text hover:text-primary px-3 py-2"
              >
                About
              </Link>
            </div>
          </div>
        </nav>

        <main className="flex-grow">
          <Routes>
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

        {/* Footer component will go here */}
        <footer className="bg-background border-t border-secondary mt-10">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center text-sm text-text">
            <p>&copy; 2025 Automatapedia</p>
            <p>
              An interactive journey through mathematical sequences & automata
              theory
            </p>
          </div>
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
