import React, { useState } from 'react';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import './AndroidManifestAnalysis.css'; 

const AndroidManifestAnalysis = () => {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setError('');
    setResults(null);
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/analyze_apk', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
        onDownloadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setDownloadProgress(percentCompleted);
        },
      });

      if (response.data) {
        setResults(response.data);
        setError('');
      } else {
        setError('Unexpected response format');
      }
    } catch (err) {
      setError('Error analyzing APK: ' + err.message);
      setResults(null);
    } finally {
      setLoading(false);
      setUploadProgress(0);
      setDownloadProgress(0);
    }
  };

  const handleDownload = () => {
    const element = document.getElementById('results-container');
    const opt = {
      margin: 1,
      filename: 'manifest_analysis.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().from(element).set(opt).save();
  };

  // Inline styles
  const containerStyle = {
    padding: '20px',
    maxWidth: '100%',
    margin: 'auto',
    opacity: "90%",
    backgroundColor:"white",
    borderRadius:"15px"
  };

  const formStyle = {
    marginBottom: '20px',
  };

  const errorStyle = {
    color: 'red',
    fontWeight: 'bold',
  };

  const resultsStyle = {
    marginTop: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  };

  const jsonContainerStyle = {
    border: '1px solid #ddd',
    padding: '10px',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
    width: '100%',
    textAlign: 'left',
  };

  const jsonItemStyle = {
    marginBottom: '15px',
    padding: '10px',
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
  };

  const jsonKeyStyle = {
    fontSize: '1.2em',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '15px',
    backgroundColor: '#f0f0f0',
    padding: '10px',
    borderRadius: '4px',
    textAlign: 'left',
    width: '100%',
  };

  const jsonValueStyle = {
    fontSize: '1em',
    color: '#555',
    wordWrap: 'break-word',
    textAlign: 'left',
    marginBottom: '20px',
  };

  const progressBarContainerStyle = {
    marginTop: '20px',
    width: '100%',
    backgroundColor: '#f3f3f3',
    borderRadius: '4px',
    overflow: 'hidden',
  };

  const progressBarStyle = {
    height: '20px',
    width: `${uploadProgress || downloadProgress}%`,
    backgroundColor: '#4caf50',
    textAlign: 'center',
    color: 'white',
    lineHeight: '20px',
    borderRadius: '4px',
    transition: 'width 0.4s ease-in-out',
  };

  const formatJsonResults = (results) => {
    const { exported_components, findings, insecure_api_usage, overprivileged_permissions, potential_injection_points } = results;

    return (
      <div id="results-container" style={resultsStyle}>
        <h3 style={{ width: '100%', textAlign: 'left', marginBottom: '20px' }}>Manifest Analysis:</h3>
        <h4 style={jsonKeyStyle}>Exported Components:</h4>
        {exported_components && exported_components.length > 0 ? (
          exported_components.map((component, index) => (
            <p key={index} style={jsonValueStyle}>
              <strong>{component.split(':')[0]}</strong>: {component.split(':')[1].trim()} - {component.includes('Activity') ? 'This activity is declared as exported, meaning it can be accessed by other apps.' : 'This receiver is also declared as exported, allowing interaction from other apps.'}
            </p>
          ))
        ) : (
          <p style={jsonValueStyle}>No exported components found.</p>
        )}
        <h4 style={jsonKeyStyle}>Findings:</h4>
        <div style={jsonContainerStyle}>
          <h5 style={jsonKeyStyle}>Exported Components:</h5>
          <ul>
            {findings && findings[0][1] && findings[0][1].length > 0 ? (
              findings[0][1].map((component, index) => (
                <li key={index} style={jsonItemStyle}>{component}</li>
              ))
            ) : (
              <li>No exported components found.</li>
            )}
          </ul>
          <h5 style={jsonKeyStyle}>Insecure API Usage:</h5>
          <p style={jsonValueStyle}>{insecure_api_usage && insecure_api_usage.length > 0 ? insecure_api_usage.join(', ') : 'No findings related to insecure API usage.'}</p>
          <h5 style={jsonKeyStyle}>Overprivileged Permissions:</h5>
          <p style={jsonValueStyle}>{overprivileged_permissions && overprivileged_permissions.length > 0 ? overprivileged_permissions.join(', ') : 'No findings related to overprivileged permissions.'}</p>
          <h5 style={jsonKeyStyle}>Potential Injection Points:</h5>
          <p style={jsonValueStyle}>{potential_injection_points && potential_injection_points.length > 0 ? potential_injection_points.join(', ') : 'No findings related to potential injection points.'}</p>
        </div>
        <h4 style={jsonKeyStyle}>Remediation Advice</h4>
        <p style={jsonValueStyle}><strong>Finding:</strong> Declared Exported Components</p>
        <p style={jsonValueStyle}><strong>Description:</strong> The application declares one or more components (such as activities, services, or broadcast receivers) as exported. This means these components can be accessed by other applications. Allowing external access to these components can pose a security risk, as malicious apps might exploit them to interact with or compromise your application.</p>
        <p style={jsonValueStyle}><strong>Remediation:</strong> To mitigate this risk, remove the <code>android:exported</code> attribute from the component's declaration in the manifest file. This change will prevent other apps from accessing the component.</p>
        <button onClick={handleDownload} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '1em', backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Download PDF</button>
      </div>
    );
  };

  return (
    <div style={containerStyle}>
      <h2>Android Manifest Analysis</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>Analyze</button>
      </form>
      {loading && (
        <div style={progressBarContainerStyle}>
          <div style={progressBarStyle}>
            {uploadProgress < 100 ? `Uploading: ${uploadProgress}%` : `Analyzing: ${downloadProgress}%`}
          </div>
        </div>
      )}
      {error && <p style={errorStyle}>{error}</p>}
      {results && formatJsonResults(results)}
    </div>
  );
};

export default AndroidManifestAnalysis;
