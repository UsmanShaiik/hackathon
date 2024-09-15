import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import 'jspdf-autotable';

// Import your components
import AndroidManifestAnalysis from './components/AndroidManifestAnalysis';
import LintAnalysis from './components/LintAnalysis';
import DependencyCheck from './components/DependencyCheck';
import MOBSFAnalysis from './components/MOBSFAnalysis';
import JsonUploader from './JsonUploader'; // Import JsonUploader
import Chatbot from './Chatbot'; // Import Chatbot
import Navbar from './Navbar'; // Import Navbar component
import Footer from './Footer'; // Import Footer component
import Updates from './Updates'; // Import Updates component
import Contact from './Contact'; // Import Contact component
import Help from './Help'; // Import Help component

const TypewriterText = () => {
  const typewriterRef = useRef(null);

  useEffect(() => {
    const element = typewriterRef.current;
    if (element) {
      const handleAnimationEnd = () => {
        element.classList.add('finished');
      };

      // Add event listener for animation end
      element.addEventListener('animationend', handleAnimationEnd);

      // Clean up the event listener
      return () => {
        element.removeEventListener('animationend', handleAnimationEnd);
      };
    }
  }, []);

  return (
    <header className="typewriter-container">
      <h1 ref={typewriterRef} className="typewriter">
        Hello, welcome to Static Analysis of APK
      </h1>
    </header>
  );
};

function App() {
  const [activeComponent, setActiveComponent] = useState(null);
  const [showButtons, setShowButtons] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false); // State for Chatbot visibility
  const [previousComponent, setPreviousComponent] = useState(null); // To track the previous component
  const [updatesOpen, setUpdatesOpen] = useState(false); // State for Updates visibility
  const [showContact, setShowContact] = useState(false); // State for Contact visibility
  const [showHelp, setShowHelp] = useState(false); // State for Help visibility

  // Display buttons after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButtons(true);
      setActiveComponent('buttons');
      console.log("Buttons should now be visible");
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenChatbot = () => setShowChatbot(true);
  const handleCloseChatbot = () => setShowChatbot(false);

  const handleBack = () => {
    setActiveComponent(previousComponent);
    setPreviousComponent(null); // Clear the previous component after navigating back
  };

  const handleComponentChange = (component) => {
    setPreviousComponent(activeComponent); // Set the current component as the previous one
    setActiveComponent(component);
    setShowContact(false); // Ensure Contact is hidden when switching components
    setShowHelp(false); // Ensure Help is hidden when switching components
  };

  const toggleUpdatesContainer = () => {
    setUpdatesOpen(!updatesOpen);
  };

  const handleContactClick = () => {
    if (!showContact) { // Ensure Contact is displayed only once
      setShowContact(true);
      setActiveComponent(null); // Clear the active component to ensure only Contact is visible
      setShowButtons(false); // Hide buttons when Contact is visible
      setShowHelp(false); // Ensure Help is hidden
    }
  };

  const handleHelpClick = () => {
    if (!showHelp) { // Ensure Help is displayed only once
      setShowHelp(true);
      setActiveComponent(null); // Clear the active component to ensure only Help is visible
      setShowContact(false); // Ensure Contact is hidden
      setShowButtons(false); // Hide buttons when Help is visible
    }
  };

  const renderComponent = () => {
    console.log("Rendering component:", activeComponent); // Debugging statement
    switch (activeComponent) {
      case 'manifest':
        return <AndroidManifestAnalysis />;
      case 'lint':
        return <LintAnalysis />;
      case 'dependency':
        return <DependencyCheck />;
      case 'mobsf':
        return <MOBSFAnalysis />;
      case 'help':
        return <Help />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <Navbar handleOpenChatbot={handleOpenChatbot} /> {/* Pass the handler to Navbar */}

      <video autoPlay loop muted className="background-video">
        <source src="/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <TypewriterText /> {/* Use the TypewriterText component here */}

      {/* Updates component */}
      <Updates updatesOpen={updatesOpen} toggleUpdatesContainer={toggleUpdatesContainer} />

      {!showContact && !showHelp && showButtons && (
        <div className="button-group">
          <button onClick={() => handleComponentChange('manifest')}>Manifest Analysis</button>
          <button onClick={() => handleComponentChange('lint')}>Lint Analysis</button>
          <button onClick={() => handleComponentChange('dependency')}>Dependency Check</button>
          <button onClick={() => handleComponentChange('mobsf')}>In-depth Analysis</button>
        
        </div>
      )}

      {showContact && (
        <div className="contact-container">
          <Contact />
          <button className="back-button" onClick={() => setShowContact(false)}>
            Back
          </button>
        </div>
      )}

      {showHelp && (
        <div className="help-container">
          <Help />
          <button className="back-button" onClick={() => setShowHelp(false)}>
            Back
          </button>
        </div>
      )}

      {!showContact && !showHelp && activeComponent && (
        <div className="component-container">
          {/* Render a back button if there is an active component */}
          {previousComponent && (
            <button className="back-button" onClick={handleBack}>
              Back
            </button>
          )}
          {renderComponent()}
        </div>
      )}

      {/* Render the JsonUploader component */}
      {!showContact && !showHelp && <JsonUploader />}

      {/* Render the Chatbot component */}
      {showChatbot && <Chatbot onClose={handleCloseChatbot} />}

      {/* Render the Footer component */}
      <Footer />
    </div>
  );
}

export default App;
