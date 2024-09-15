import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from './AL.png';
import './navbar.css';
import Contact from './Contact'; // Import Contact component
import Help from './Help'; // Import Help component

const Navbar = ({ handleOpenChatbot }) => {
  const [showContact, setShowContact] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const location = useLocation();

  const handleContactClick = () => {
    setShowContact(true);
    setShowHelp(false);
  };

  const handleHelpClick = () => {
    setShowHelp(true);
    setShowContact(false);
  };

  useEffect(() => {
    if (location.pathname !== '/contact' && location.pathname !== '/help') {
      setShowContact(false);
      setShowHelp(false);
    }
  }, [location.pathname]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-danger">
        <Link to="/home" className="navbar-brand">
          <img src={logo} alt="Logo" className="toolbar-icon" />
          <span className="navbar-text">APKAnalyzer</span>
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <div className="navbar-section">
              {/* Home link */}
              <li className={`nav-item ${location.pathname === '/home' ? 'active' : ''}`}>
                <Link to="/home" className="nav-link">Home</Link>
              </li>

              {/* Contact link */}
              <li className={`nav-item ${location.pathname === '/contact' ? 'active' : ''}`}>
                <Link to="/contact" className="nav-link" onClick={handleContactClick}>Contact</Link>
              </li>

              {/* Help link */}
              <li className={`nav-item ${location.pathname === '/help' ? 'active' : ''}`}>
                <Link to="/help" className="nav-link" onClick={handleHelpClick}>Help</Link>
              </li>

              {/* About link */}
              <li className={`nav-item ${location.pathname === '/about' ? 'active' : ''}`}>
                <Link to="/about" className="nav-link">About</Link>
              </li>
            </div>
          </ul>

          {/* Chatbot icon */}
          <img src="./cb.png" alt="Chatbot Icon" className="chatbot-icon" onClick={handleOpenChatbot} />
        </div>
      </nav>

      {/* Conditionally render the Contact and Help components */}
      {(showContact || showHelp) && (
        <div className="overlay">
          {showContact && <Contact />}
          {showHelp && <Help />}
        </div>
      )}
    </div>
  );
};

export default Navbar;
