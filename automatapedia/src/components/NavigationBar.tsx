import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, List, CloseSquare } from "@solar-icons/react";
import "./NavigationBar.css"; // We'll create this CSS file next

interface NavLinkItem {
  path: string;
  label: string;
}

interface NavigationBarProps {
  theme: string;
  toggleTheme: () => void;
  navLinkItems: NavLinkItem[];
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  theme,
  toggleTheme,
  navLinkItems,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Close mobile menu on route change
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="main-nav">
      <div className="nav-content">
        <Link to="/" className="nav-logo">
          <span className="logo-automata">Automata</span>
          <span className="logo-pedia">pedia</span>
        </Link>
        <ul className="nav-links desktop-nav-links">
          {navLinkItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path}>{item.label}</Link>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <button
            onClick={toggleTheme}
            className="theme-toggle-button"
            aria-label={
              theme === "light" ? "Switch to dark mode" : "Switch to light mode"
            }
          >
            {theme === "light" ? (
              <Moon size={24} weight="Bold" />
            ) : (
              <Sun size={24} weight="Bold" />
            )}
          </button>
          <button
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <CloseSquare size={28} weight="Bold" />
            ) : (
              <List size={28} weight="Bold" />
            )}
          </button>
        </div>
      </div>
      <ul
        className={`nav-links mobile-nav-links ${
          isMobileMenuOpen ? "mobile-open" : ""
        }`}
      >
        {navLinkItems.map((item) => (
          <li key={item.path}>
            <Link to={item.path} onClick={handleMobileLinkClick}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationBar;
