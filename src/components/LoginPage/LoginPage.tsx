import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './LoginPage.css';

interface LoginPageProps {
  onBackToLanding: () => void;
  onSwitchToSignup: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onBackToLanding, onSwitchToSignup }) => {
  const clientId = "192752908138-2dbd7u25msr3sb7s9ffnukhvm57hh4ob.apps.googleusercontent.com";
  const [step, setStep] = useState<number>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleGoogleSuccess = (credentialResponse: any) => {
    console.log("Google Login Success:", credentialResponse);
  };

  const handleGoogleFailure = () => {
    console.error("Google Login Failed");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      console.log("Login attempt with:", formData);
      // Add your login logic here
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBackToLanding();
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <button type="button" onClick={handleBack} className="back-button">
              ← Back
            </button>
            <h1>Welcome back</h1>
            <div className="form-field">
              <input 
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email address"
                required
                className="input-field"
              />
            </div>
            <button type="submit" className="continue-button">
              Continue
            </button>
            <div className="signup-link">
              Don't have an account? {' '}
              <button 
                type="button"
                onClick={onSwitchToSignup}
                className="text-link"
              >
                Sign up
              </button>
            </div>
            <div className="divider">
              <span>OR</span>
            </div>
            <div className="google-login-wrapper">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
                size="large"
                width="300"
              />
            </div>
          </>
        );
      
      case 2:
        return (
          <>
            <button type="button" onClick={handleBack} className="back-button">
              ← Back
            </button>
            <h1>Enter your password</h1>
            <div className="email-display">
              {formData.email}
              <button 
                type="button" 
                onClick={() => setStep(1)}
                className="edit-button"
              >
                Edit
              </button>
            </div>
            <div className="form-field password-field">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password*"
                required
                className="input-field"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁" : "👁"}
              </button>
            </div>
            <div className="forgot-password">
              <button type="button" className="text-link">
                Forgot password?
              </button>
            </div>
            <button type="submit" className="continue-button">
              Continue
            </button>
            <div className="signup-link">
              Don't have an account? {' '}
              <button 
                type="button"
                onClick={onSwitchToSignup}
                className="text-link"
              >
                Sign up
              </button>
            </div>
            <div className="divider">
              <span>OR</span>
            </div>
            <div className="google-login-wrapper">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
                size="large"
                width="300"
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="login-container">
        <div className="login-box">
          <form className="login-form" onSubmit={handleContinue}>
            {renderStepContent()}
          </form>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;