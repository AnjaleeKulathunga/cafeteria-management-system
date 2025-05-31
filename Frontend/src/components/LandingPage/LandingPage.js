import React from 'react';
import InitialNav from '../Nav/InitialNav';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page">
      <InitialNav />
      <div className="landing-content">
        <div className="hero-section">
          <h1>Welcome to MEALmate</h1>
          <p>Your trusted partner for delicious and convenient hostel dining</p>
          <div className="cta-buttons">
            <a href="/regi" className="cta-button primary">Get Started</a>
            <a href="/log" className="cta-button secondary">Sign In</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage; 