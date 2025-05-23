import {
  BrowserRouter,
  Routes,
  Route,
  // Link and useLocation are now used in NavigationBar.tsx
} from "react-router-dom"; // Import BrowserRouter
import { motion } from "framer-motion";
// Sun, Moon, List, CloseSquare are now used in NavigationBar.tsx
import "./index.css";
import HomePage from "./pages/HomePage";
import CollatzPage from "./pages/CollatzPage";
import FibonacciPage from "./pages/FibonacciPage";
import TribonacciPage from "./pages/TribonacciPage";
import LucasPage from "./pages/LucasPage";
import EuclideanPage from "./pages/EuclideanPage";
import PascalPage from "./pages/PascalPage";
import AboutPage from "./pages/AboutPage";
import { useState, useEffect } from "react";
import NavigationBar from "./components/NavigationBar"; // Import the new component

const navLinkItems = [
  { path: "/", label: "Home" },
  { path: "/collatz", label: "Collatz" },
  { path: "/fibonacci", label: "Fibonacci" },
  { path: "/tribonacci", label: "Tribonacci" },
  { path: "/lucas", label: "Lucas" },
  { path: "/euclidean", label: "Euclidean" },
  { path: "/pascal", label: "Pascal" },
  { path: "/about", label: "About" },
];

const AppLayout: React.FC = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "light";
  });

  // isMobileMenuOpen and location logic is now in NavigationBar.tsx

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // toggleMobileMenu and handleMobileLinkClick are now in NavigationBar.tsx

  return (
    <div className="app-container">
      <NavigationBar
        theme={theme}
        toggleTheme={toggleTheme}
        navLinkItems={navLinkItems}
      />
      <main className="main-content">
        <Routes>
          {navLinkItems.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={
                <AnimatedPage>
                  {/* This dynamic rendering of components can be simplified if preferred */}
                  {item.path === "/" && <HomePage />}
                  {item.path === "/collatz" && <CollatzPage />}
                  {item.path === "/fibonacci" && <FibonacciPage />}
                  {item.path === "/tribonacci" && <TribonacciPage />}
                  {item.path === "/lucas" && <LucasPage />}
                  {item.path === "/euclidean" && <EuclideanPage />}
                  {item.path === "/pascal" && <PascalPage />}
                  {item.path === "/about" && <AboutPage />}
                </AnimatedPage>
              }
            />
          ))}
        </Routes>
      </main>
      <footer className="main-footer">
        <p>© 2025 Automatapedia</p>
        <p>
          An interactive journey through mathematical sequences & automata
          theory
        </p>
      </footer>
    </div>
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

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
};

export default App;
