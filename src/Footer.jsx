import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-section">
          <h3>DramaShield</h3>
          <p>Your Twitter Content Filter</p>
        </div>

       
        <div className="footer-section">
          <h4>Supported Platforms</h4>
          <ul>
            <li>Chrome</li>
            <li>Firefox</li>
            <li>Microsoft Edge</li>
            <li>Opera</li>
            <li>Safari</li>
          </ul>
        </div>

        
        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li>Documentation</li>
            <li>Source Code</li>
            <li>Report Bugs</li>
            <li>Feedback</li>
            <li>Release Notes</li>
            <li>Community Support</li>
          </ul>
        </div>

        
        <div className="footer-section">
          <h4>Default Filters</h4>
          <ul>
            <li>Default DramaShield Filters</li>
            <li>Popular Twitter Filters</li>
            <li>Spam Accounts</li>
            <li>Troll Accounts</li>
            <li>Unwanted Mentions</li>
          </ul>
        </div>

       
        <div className="footer-section">
          <h4>Other Tools</h4>
          <ul>
            <li>🔹 Soon </li>
            <li>🔹 Soon </li>
          </ul>
        </div>
      </div>

      
      <div className="footer-note">
        <p>
          DramaShield is developed by Mori Labs.
        </p>
        <p>
          This project is maintained by our dedicated team.
        </p>
        <p>
          If you're interested in contributing to this project, please <a href="#">get in touch</a>.
        </p>
        <p>Your support is appreciated, but we do not accept donations.</p>
      </div>
    </footer>
  );
};

export default Footer;
