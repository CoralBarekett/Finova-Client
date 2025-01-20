import { useState } from 'react';
import './HomePage.css';
import FinovaIcon from '../UserProfilePage/Icon';
import UserProfileIcon from './HomePageIcons';
import { motion, AnimatePresence } from 'framer-motion';
import { Diamond, LineChart, LogOut, UserCircle } from 'lucide-react';

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
      <nav className="nav-container">
        <div className="nav-buttons">
          <FinovaIcon className="Finova-icon" />
        </div>
        <div className="nav-right">
          <button 
            className="nav-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <UserProfileIcon className="user-profile-icon" />
          </button>
        </div>
      </nav>

      <div className="hero-section">
        <div className="hero-content">
          <img 
            src="src/assets/logo.jpg" 
            alt="Finova AI Logo"
            className="hero-logo"
          />
          <h1 className="hero-title">Choose Your Plan</h1>
          <p className="hero-subtitle">Get started with the perfect plan for your needs</p>
        </div>
      </div>

      <div className="pricing-container">
        {plans.map((plan) => (
          <div 
            key={plan.type} 
            className={`pricing-card ${plan.type.toLowerCase()}-card`}
          >
            <div className="card-header">
              <h2 className="pricing-title">{plan.type}</h2>
              <div className="pricing-price">
                <span className="price-amount">${plan.price}</span>
                <span className="price-period">/month</span>
              </div>
            </div>
            <button
              className={`pricing-button ${
                plan.type === 'Pro' ? 'pro' : 'free'
              }`}
            >
              {plan.type === 'Free' ? 'Current Plan' : 'Upgrade to Pro'}
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

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="user-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <a href="#" className="menu-item">
              <UserCircle className="menu-icon" />
              My Profile
            </a>
            <a href="#" className="menu-item">
              <LineChart className="menu-icon" />
              Investment Journal
            </a>
            <a href="#" className="menu-item">
              <Diamond className="menu-icon" />
              Upgrade Plan
            </a>
            <button 
              onClick={onLogOut}
              className="menu-item logout-button"
            >
              <LogOut className="menu-icon logout-icon" />
              Log out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;