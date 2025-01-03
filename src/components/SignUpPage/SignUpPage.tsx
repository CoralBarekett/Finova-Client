import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './SignUpPage.css';

interface SignUpPageProps {
  onBackToLanding: () => void;
  onSwitchToLogin: () => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onBackToLanding, onSwitchToLogin }) => {
  const clientId = "192752908138-2dbd7u25msr3sb7s9ffnukhvm57hh4ob.apps.googleusercontent.com";
  const [step, setStep] = useState<number>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
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
    if (step < 3) {
      setStep(step + 1);
    } else {
      console.log("Final form data:", formData);
      // Here you would typically send the data to your backend
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
            <div className="form-field">
              <input 
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email address*"
                required
                className="input-field"
              />
            </div>
            <button type="submit" className="continue-button">
              Continue
            </button>
            <div className="signin-link">
              Already have an account? {' '}
              <button 
                type="button"
                onClick={onSwitchToLogin}
                className="text-link"
              >
                Sign in
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
            <div className="email-display">{formData.email}</div>
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
            <button type="submit" className="continue-button">
              Continue
            </button>
            <button type="button"
                    onClick={handleBack}
                    className="go-back" >
              Go back
            </button>
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

      case 3:
        return (
          <>
            <div className="form-field">
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                required
                className="input-field"
              />
            </div>
            <button type="submit" className="continue-button">
              Create Account
            </button>
            <button type="button"
                    onClick={handleBack}
                    className="go-back" >
              Go back
            </button>
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
      <div className="signup-container">
        <div className="signup-box">
          <h1>Create your account</h1>
          <form className="signup-form" onSubmit={handleContinue}>
            {renderStepContent()}
          </form>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default SignUpPage;