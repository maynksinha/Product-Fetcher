import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import './Confirmation.css';

const Confirmation = ({ isOpen, onClose }) => {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setAnimate(true);
      }, 100);
      
      const closeTimer = setTimeout(() => {
        setAnimate(false);
        setTimeout(onClose, 500);
      }, 3000);
      
      return () => {
        clearTimeout(timer);
        clearTimeout(closeTimer);
      };
    }
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <div className="order-confirmation-overlay">
      <div className={`order-confirmation ${animate ? 'animate' : ''}`}>
        <div className="check-circle">
          <Check size={48} strokeWidth={3} />
        </div>
        <h2>Order Placed!</h2>
      </div>
    </div>
  );
};

export default Confirmation;