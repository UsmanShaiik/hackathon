import React, { useState } from 'react';
import './dependencyCheck.css';  // Import the CSS file

const DependencyCheck = () => {
  const [sourceCodePath, setSourceCodePath] = useState('');
  const [reportUrl, setReportUrl] = useState(null);
  const [error, setError] = useState(null);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://192.168.164.174:5000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ source_code_path: sourceCodePath }),
      });

      if (response.ok) {
        // Create a URL for the report
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setReportUrl(url);
        setError(null);
      } else {
        const data = await response.json();
        setError(data.error);
        setReportUrl(null);
      }

    } catch (err) {
      setError('Error connecting to the server.');
      setReportUrl(null);
    }
  };

  return (
    <div className="container">
      <h2>Dependency Check</h2>
      <div className="button-container">
        <button className="button">C1</button>
        <button className="button">C2</button>
        <button className="button">C3</button>
        <button className="button">C4</button>
      </div>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Enter Source Code Path:
          <input
            type="text"
            value={sourceCodePath}
            onChange={(e) => setSourceCodePath(e.target.value)}
            className="input-field"
          />
        </label>
        <button type="submit" className="button">Analyze</button>
      </form>

      {error && <p className="error">{error}</p>}
      {reportUrl && (
        <iframe
          src={reportUrl}
          className="iframe-container"
          title="Dependency Check Report"
        />
      )}
    </div>
  );
};

export default DependencyCheck;
