// src/components/Help.js
import React from 'react';
import './Help.css'; // Import the CSS file
import Navbar from './Navbar'; // Import Navbar component

const Help = () => (
  <div className="help-page">
    <Navbar />
    <div className="help-container">
    <h2>Help</h2>
<p>If you have any questions or need assistance, you are in the right place. Below you'll find a list of common queries and their answers to help you navigate and use App Shield more effectively.</p>

<p><strong>What is App Shield?</strong><br />
App Shield is a web-based static analysis platform designed to identify vulnerabilities in Android apps before deployment. It integrates multiple tools like MobSF, Android Lint, Dependency-Check, and Androguard, and offers an AI-powered remediation assistant to provide automatic mitigation suggestions.</p>

<p><strong>How does App Shield work?</strong><br />
You can upload an APK file for analysis, and App Shield will scan every part of your app, including third-party libraries, to detect early vulnerabilities. Detailed reports are generated, and the AI assistant will offer suggestions for fixing security issues.</p>

<p><strong>What are the key features of App Shield?</strong><br />
- Multiple tool integration: MobSF, Android Lint, Dependency-Check, Androguard<br />
- AI-powered remediation assistant for automatic vulnerability fixes<br />
- Detailed reporting with comprehensive insights into detected issues<br />
- Third-party library analysis</p>

<p><strong>What technologies are used in App Shield?</strong><br />
The platform is built using Python and JavaScript. The backend runs on Flask, while the frontend is developed using React.js. Tools like MobSF, Android Lint, Dependency-Check, Androguard, and Gemini API (for AI-based recommendations) are integrated to perform detailed static analysis.</p>

<p><strong>What challenges does App Shield solve?</strong><br />
App Shield addresses the challenge of providing accurate AI-based remediation suggestions and efficiently handling large APK files by fine-tuning AI models with known vulnerability datasets and optimizing backend performance.</p>

<p><strong>What are the benefits of using App Shield?</strong><br />
- Early vulnerability detection improves security for Android apps.<br />
- AI automation reduces manual effort in vulnerability management.<br />
- User-friendly interface simplifies the process for developers.</p>

<p>If you need further assistance, please don't hesitate to contact our support team. Thank you for using App Shield!</p>

    </div>
  </div>
);

export default Help;
