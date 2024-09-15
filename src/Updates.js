// src/Updates.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import './Updates.css';

const Updates = ({ updatesOpen, toggleUpdatesContainer }) => {
  return (
    <div className="updates-wrapper">
      <button className="btn updates-button" onClick={toggleUpdatesContainer}>
        <FontAwesomeIcon icon={faBell} />
      </button>

      {updatesOpen && (
        <div className="updates-container">
          <h4>Upcoming Updates</h4>
          <ul>
            <li>Update 1: Addeing support for new vulnerability types.</li>
            <li>Update 2:  Improveing detection of security flaws in libraries.</li>
            <li>Update 3:  Making Better analysis of encrypted APKs.</li>
            <li>Update 4: Adding Alerts for high-severity vulnerabilities.</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Updates;
