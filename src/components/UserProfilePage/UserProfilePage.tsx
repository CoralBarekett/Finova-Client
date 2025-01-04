import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import NetworkIcon from './Icon';
import './UserProfilePage.css';

// Custom hook for typing animation
const useTypingEffect = (fullText: string, typingSpeed: number = 100) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isTypingComplete, setIsTypingComplete] = useState(false);

    useEffect(() => {
        let i = 0;
        setDisplayedText(''); // Reset text when fullText changes
        setIsTypingComplete(false);

        const typingInterval = setInterval(() => {
            if (i < fullText.length) {
                setDisplayedText(prev => prev + fullText.charAt(i));
                i++;
            } else {
                setIsTypingComplete(true);
                clearInterval(typingInterval);
            }
        }, typingSpeed);

        return () => clearInterval(typingInterval);
    }, [fullText, typingSpeed]);

    return { displayedText, isTypingComplete };
};

interface UserProfileProps {
    onBackToHome?: () => void;
    accountType: 'free' | 'professional';
    username?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ username = 'User' }) => {
    const [greeting, setGreeting] = useState<string>('');
    const [formData, setFormData] = useState({
        // Personal Information
        fullName: '',
        email: '',

        // Investment Details
        investmentAmount: '',
        investmentType: '',
        duration: '',

        // Financial Baseline
        monthlyIncome: '',
        emergencyFund: '',
        existingDebts: '',

        // Investment Preferences
        timeline: '',
        liquidity: '',
        investmentGoals: '',
        riskTolerance: '',
        marketExperience: '',

        // Tax Information
        taxBracket: '',
        taxAccounts: '',
        taxConsiderations: ''
    });

    const investment = {
        id: 'INV-2024-001',
        amount: '$10,000',
        status: 'Active',
        yield: '4.5%'
    };

    // Function to parse yield percentage and determine if it's positive
    const parseYieldValue = (yieldString: string): number => {
        return parseFloat(yieldString.replace('%', ''));
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) {
            return 'Good morning';
        } else if (hour >= 12 && hour < 17) {
            return 'Good afternoon';
        } else {
            return '  Good evening';
        }
    };

    useEffect(() => {
        const updateGreeting = () => {
            setGreeting(getGreeting());
        };
        
        updateGreeting();
        const intervalId = setInterval(updateGreeting, 60000);
        
        return () => clearInterval(intervalId);
    }, []);

    // Use the typing effect hook for the complete greeting
    const fullGreeting = `${greeting}, ${username}`;
    const { displayedText } = useTypingEffect(fullGreeting, 70);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="profile-container">
            {/* Welcome Section */}
            <div className="welcome-section">
                <NetworkIcon className="welcome-network-icon" />
                    <div className="welcome-text">
                        <h1 className="typing-text">
                            {displayedText}
                        </h1>
                </div>
            </div>

            {/* Personal Information Section */}
            <div className="card">
                <div className="card-content">
                    <h2>Personal Information</h2>
                    <div className="form-grid">
                        <div className="form-column">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    placeholder="Enter full name"
                                />
                            </div>
                        </div>
                        <div className="form-column">
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter email"
                                />
                            </div>
                        </div>
                    </div>
                    <button className="edit-button">Edit</button>
                </div>
            </div>

            {/* Investment Preferences Section */}
            <div className="card">
                <div className="card-content">
                    <h2>Investment Preferences</h2>
                    <div className="form-grid">
                        <div className="form-column">
                            <div className="form-group">
                                <label>Investment Amount</label>
                                <input
                                    type="number"
                                    name="investmentAmount"
                                    value={formData.investmentAmount}
                                    onChange={handleInputChange}
                                    placeholder="Enter amount"
                                />
                            </div>
                            <div className="form-group">
                                <label>Investment Type</label>
                                <input
                                    type="text"
                                    name="investmentType"
                                    value={formData.investmentType}
                                    onChange={handleInputChange}
                                    placeholder="Enter investment type"
                                />
                            </div>
                            <div className="form-group">
                                <label>Investment Timeline</label>
                                <select
                                    name="timeline"
                                    value={formData.timeline}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select timeline</option>
                                    <option value="short">Short-term (0-2 years)</option>
                                    <option value="medium">Medium-term (2-5 years)</option>
                                    <option value="long">Long-term (5+ years)</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-column">
                            <div className="form-group">
                                <label>Duration</label>
                                <input
                                    type="text"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleInputChange}
                                    placeholder="Enter duration"
                                />
                            </div>
                            <div className="form-group">
                                <label>Risk Tolerance</label>
                                <select
                                    name="riskTolerance"
                                    value={formData.riskTolerance}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select risk tolerance</option>
                                    <option value="conservative">Conservative</option>
                                    <option value="moderate">Moderate</option>
                                    <option value="aggressive">Aggressive</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Investment History Section */}
            <div className="card">
                <div className="card-content">
                    <h2>Investment History</h2>
                    <div className="investment-grid">
                        <div className="investment-item">
                            <span className="label">Investment ID</span>
                            <span className="value">{investment.id}</span>
                        </div>
                        <div className="investment-item">
                            <span className="label">Amount</span>
                            <span className="value">{investment.amount}</span>
                        </div>
                        <div className="investment-item">
                            <span className="label">Status</span>
                            <span className="value status-active">{investment.status}</span>
                        </div>
                        <div className="investment-item">
                            <span className="label">Current Yield</span>
                            <span className={`yield ${parseYieldValue(investment.yield) >= 0 ? 'positive' : 'negative'}`}>
                                {investment.yield}
                                {parseYieldValue(investment.yield) >= 0 ? 
                                    <ArrowUp className="inline-icon" size={16} /> : 
                                    <ArrowDown className="inline-icon" size={16} />
                                }
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;