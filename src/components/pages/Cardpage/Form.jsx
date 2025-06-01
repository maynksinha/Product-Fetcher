import React from 'react';
import Rating from './Rating';
import './Form.css';

const Form = ({ 
  newReview, 
  onInputChange, 
  onRatingChange, 
  onSubmit, 
  isEditing
}) => {
  return (
    <div className="review-form-container">
      <div className="form-header">
        <h3>{isEditing ? 'Edit Review' : 'Write a Review'}</h3>
      </div>

      <form onSubmit={onSubmit} className="review-form">
        <div className="form-group">
          <label>Your Rating</label>
          <Rating 
            rating={newReview.rating} 
            interactive={true} 
            onChange={onRatingChange}
            size="large"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="review-name">Your Name</label>
          <input
            type="text"
            id="review-name"
            name="name"
            value={newReview.name}
            onChange={onInputChange}
            placeholder="Enter your name"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="review-comment">Your Review</label>
          <textarea
            id="review-comment"
            name="comment"
            value={newReview.comment}
            onChange={onInputChange}
            placeholder="What did you think about this product?"
            rows="4"
            required
          ></textarea>
        </div>
        
        <button type="submit" className="submit-review">
          {isEditing ? 'Update Review' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default Form;