import React, { useState } from 'react';
import './Terms.css';
import { LogIn } from 'lucide-react';

const Terms = ({ isOpen, onClose, onAccept }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleAccept = () => {
    if (isChecked) {
      onAccept();
      onClose();
    }
  };

  return (
    <div className="terms-overlay">
      <div className="terms-modal">
        <h2 className="modal-header">Sign in to <span className='title'>Product Fetcher</span></h2>
        
        <div className="modal-content">
          <div className="signin-section">
            <div className="login-icon">
              <LogIn size={40} />
            </div>
            
            <div className="input-group">
              <input
                type="email"
                className="signin-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="signin-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="terms-section">
            <h3>Terms and Conditions</h3>
            <div className="terms-content">
              <p>
                Welcome to <span className="title">Product Fetcher!</span> Before you proceed, please read and accept our terms.
              </p>
              <ul>
                <li><strong>User Agreement:</strong> Using this app means you agree to our terms and privacy policies.</li>
                <li><strong>Account Responsibility:</strong> You're responsible for all activity under your account.</li>
                <li><strong>Privacy:</strong> We respect your data. Review our Privacy Policy for details.</li>
              </ul>

            </div>

            <div className="terms-checkbox">
              <input 
                type="checkbox" 
                id="accept-terms" 
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
              <label htmlFor="accept-terms">I agree to the Terms and Conditions</label>
            </div>

            <div className="terms-buttons">
              <button className="decline-button" onClick={onClose}>Decline</button>
              <button 
                className={`accept-button ${!isChecked ? 'disabled' : ''}`}
                onClick={handleAccept}
                disabled={!isChecked}
              >
                Accept & Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;