import React from 'react';
import { Star } from 'lucide-react';
import './Rating.css';

const Rating = ({ rating, size = 'medium', interactive = false, onChange }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const partialStar = rating % 1;
  const emptyStars = totalStars - fullStars - (partialStar > 0 ? 1 : 0);
  
  const sizeClass = {
    small: 'rating-small',
    medium: 'rating-medium',
    large: 'rating-large'
  }[size];
  
  const handleStarClick = (index) => {
    if (interactive && onChange) {
      onChange(index + 1);
    }
  };

  return (
    <div className={`rating ${sizeClass} ${interactive ? 'interactive' : ''}`}>
      {[...Array(fullStars)].map((_, index) => (
        <Star
          key={`full-${index}`}
          className="star full"
          fill="#FBBF24"
          strokeWidth={0}
          onClick={() => handleStarClick(index)}
        />
      ))}
      
     
      {partialStar > 0 && (
        <div className="partial-star-container">
          <div 
            className="partial-star-fill" 
            style={{ width: `${partialStar * 100}%` }}
          >
            <Star
              className="star"
              fill="#FBBF24"
              strokeWidth={0}
            />
          </div>
          <Star
            className="star outline"
            stroke="#FBBF24"
            fill="none"
            onClick={() => handleStarClick(fullStars)}
          />
        </div>
      )}
   
      {[...Array(emptyStars)].map((_, index) => (
        <Star
          key={`empty-${index}`}
          className="star empty"
          stroke="#D1D5DB"
          fill="none"
          onClick={() => handleStarClick(fullStars + (partialStar > 0 ? 1 : 0) + index)}
        />
      ))}
    </div>
  );
};

export default Rating;