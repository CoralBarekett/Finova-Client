import React from 'react';
import './LandingPage.css';

interface LandingPageProps {
  onSignUp: () => void;
  onLogIn: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSignUp, onLogIn }) => {
  return (
    <div className="landing-container">
      <div className="landing-box">
        <h1>Get started</h1>
        <div className="landing-buttons">
          <button onClick={onLogIn} className="landing-button">
            Log in
          </button>
          <button onClick={onSignUp} className="landing-button">
            Sign up
          </button>
        </div>
        <div className="try-first">
            <button>
              Try it first
            </button>
          </div>
      </div>
    </div>
  );
};

export default LandingPage;