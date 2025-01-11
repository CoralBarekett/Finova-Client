import { useState } from 'react';
import './HomePage.css';
import NetworkIcon from '../UserProfilePage/Icon';
import { SearchIcon, UserProfileIcon } from './HomePageIcons';
import SearchBar from './SearchBar';


interface HomePageProps {
  onLogOut: () => void;
}

interface PricingPlan {
  type: 'Free' | 'Pro';
  price: number;
  features: string[];
}

const HomePage: React.FC<HomePageProps> = ({ onLogOut }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const plans: PricingPlan[] = [
    {
      type: 'Free',
      price: 0,
      features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5']
    },
    {
      type: 'Pro',
      price: 100,
      features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5']
    }
  ];

  return (
    <div className="home-container">
      {/* Navigation */}
      <nav className="nav-container">
        <div className="nav-buttons">
          <NetworkIcon className="welcome-network-icon" />
          <SearchBar />
        </div>
        <button 
          className="nav-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <UserProfileIcon />
        </button>
      </nav>

      {/* Logo Section */}
      <div className="logo-container">
        <img 
          src="src/assets/logo.jpg" 
          alt="Finova AI Logo"
        />
      </div>

      {/* Pricing Cards */}
      <div className="pricing-container">
        {plans.map((plan) => (
          <div key={plan.type} className="pricing-card">
            <h2 className="pricing-title">{plan.type}</h2>
            <div className="pricing-price">
              <span className="price-amount">${plan.price}</span>
              <span className="price-period">/month</span>
            </div>
            <button
              className={`pricing-button ${
                plan.type === 'Pro' ? 'pro' : 'free'
              }`}
            >
              {plan.type === 'Free' ? 'Your current plan' : 'Get Pro'}
            </button>
            <ul className="feature-list">
              {plan.features.map((feature, index) => (
                <li key={index} className="feature-item">
                  <span className="feature-check">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* User Menu */}
      {isMenuOpen && (
        <div className="user-menu">
          <a href="#" className="menu-item">
            👤 My info
          </a>
          <a href="#" className="menu-item">
            📊 Investment journal
          </a>
          <a href="#" className="menu-item">
            💎 Upgrade plan
          </a>
          <button 
            onClick={onLogOut}
            className="menu-item"
          >
            🚪 Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;