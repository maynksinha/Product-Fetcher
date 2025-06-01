// import React, { useState } from 'react';
import './Cards.css';
import { useNavigate } from 'react-router-dom';
import Rating from './pages/Cardpage/Rating';

const Cards = (props) => {
  const imgurl = props.images && props.images.length > 0 ? props.images[0] : null;
  // const [count, setCount] = useState(0);
  const navigate = useNavigate();

  // const handleAddToCart = (e) => {
  //   e.stopPropagation();
  //   setCount(1);
  // };

  // const increment = (e) => {
  //   e.stopPropagation();
  //   if (count < 20) {
  //     setCount(prev => prev + 1);
  //   }
  // };

  // const decrement = (e) => {
  //   e.stopPropagation();
  //   if (count > 1) {
  //     setCount(prev => prev - 1);
  //   } else {
  //     setCount(0); 
  //   }
  // };

  const handleCardClick = () => {
    navigate(`/product/${props.id}`);
  };

  return (
    <div className="cards" onClick={handleCardClick}>
      <section className="images">
        {imgurl ? <img src={imgurl} alt={props.title} /> : <p>No image</p>}
      </section>
      <section className="title">{props.title}</section>
      <section className="brand">{props.brand}</section>
      <section className="price">₹{props.price}</section>
      <Rating rating = {props.rating}/>
      <section className="category">{props.category}</section>

      {/* {count === 0 ? (
        <button className="add-btn" onClick={handleAddToCart}>
          Add to cart
        </button>
      ) : (
        <div className="counter">
          <button className="counter-btn" onClick={decrement}>−</button>
          <span className="count">{count}</span>
          <button className="counter-btn" onClick={increment}>+</button>
        </div>
      )} */}
    </div>
  );
};

export default Cards;