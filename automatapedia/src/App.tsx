import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CollatzPage from "./pages/CollatzPage";
import EuclideanPage from "./pages/EuclideanPage";
import FibonacciPage from "./pages/FibonacciPage";
import LucasPage from "./pages/LucasPage";
import PascalPage from "./pages/PascalPage";
import TribonacciPage from "./pages/TribonacciPage";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
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
        <Routes>
          <Route path="/collatz" element={<CollatzPage />} />
          <Route path="/euclidean" element={<EuclideanPage />} />
          <Route path="/fibonacci" element={<FibonacciPage />} />
          <Route path="/lucas" element={<LucasPage />} />
          <Route path="/pascal" element={<PascalPage />} />
          <Route path="/tribonacci" element={<TribonacciPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
