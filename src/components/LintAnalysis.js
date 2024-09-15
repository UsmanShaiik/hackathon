import React, { useState } from 'react';
import axios from 'axios';
import './LintAnalysis.css';
 // Import the CSS file

const LintAnalysis = () => {
  const [path, setPath] = useState('');
  const [reportUrl, setReportUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input path change
  const handlePathChange = (event) => {
    setPath(event.target.value);
  };

  // Function to trigger Lint analysis based on type
  const handleLint = async (analysisType) => {
    if (!path) {
      alert('Please enter a path first!');
      return;
    }

    setLoading(true);

    try {
      // Send the path and analysisType to backend
      const response = await axios.post('http://192.168.164.174:5000/run-lint', {
        path: path,
        analysisType: analysisType
      });

      // Assuming the report is always saved in the reports folder
      if (response.data) {
        setReportUrl('http://192.168.164.174:5000/reports/lint-report.html'); // Set the static report URL
        setError(null);
      } else {
        setReportUrl(null);
        setError('No report generated or report is empty');
      }
    } catch (error) {
      setReportUrl(null);
      setError(error.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="button-container">
        <button className="button" onClick={() => handleLint('basic')}>Basic Lint Analysis</button>
        {/* <button className="button" onClick={() => handleLint('docs')}>Generate Docs Analysis</button>
        <button className="button" onClick={() => handleLint('errors')}>Only Error Analysis</button>
        <button className="button" onClick={() => handleLint('fatal')}>Severe Fatal Analysis</button>
        <button className="button" onClick={() => handleLint('baseline')}>Baseline Analysis</button>
        <button className="button" onClick={() => handleLint('config')}>Lint.xml Configuration Analysis</button> */}
      </div>

      <input
        type="text"
        value={path}
        onChange={handlePathChange}
        placeholder="Enter path to analyze"
        className="input-field"
      />
      {loading && <p className="loading">Running Analysis...</p>}

      {reportUrl && (
        <div className="report-container">
          <h3>Lint Report:</h3>
          <iframe
            src={reportUrl}
            className="iframe"
            title="Lint Report"
          ></iframe>
        </div>
      )}
      {error && <pre className="error">Error: {error}</pre>}
    </div>
  );
};

export default LintAnalysis;
