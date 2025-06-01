import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Plus, Minus, Trash2, ChevronRight, ChevronLeft, PenLine } from 'lucide-react';
import './Description.css';
import Loader from '../../Loader';
import Rating from './Rating';
import Form from './Form';
import Navbar from '../../Navbar';
// Redux
import { addToCart } from '../../../features/user/userSlice';
import { useDispatch } from 'react-redux';

const Description = () => {
  const dispatch = useDispatch()
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const relatedRef = useRef(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const [quantity, setQuantity] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '', name: '' });
  const [addedToCart, setAddedToCart] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);

        if (data.reviews && Array.isArray(data.reviews)) {
          setReviews(data.reviews);
        }

        const allRes = await fetch('https://dummyjson.com/products');
        const allData = await allRes.json();
        const filtered = allData.products.filter(
          item => item.category === data.category && item.id !== data.id
        );
        setRelatedProducts(filtered);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();

    setSelectedImage(0);
    setQuantity(0);
    setAddedToCart(false);
  }, [id]);

  const handleAddToCart = () => {
    setQuantity(1);
    setAddedToCart(true);

    // if (window.addToCart && product) {
    //   window.addToCart(product, 1);
    // }
    dispatch(addToCart({ product, quantity: 1 }))
  };

  const increaseQuantity = () => {
    const newQty = Math.min(quantity + 1, product.stock);
    setQuantity(newQty);
    // console.log({ productId: product.id, quantity: newQty })

    dispatch(addToCart({  product , quantity: newQty }))
  };

  const decreaseQuantity = () => {
    const newQty = Math.max(quantity - 1, 0);
    setQuantity(newQty);

    if (newQty === 0) {
      setAddedToCart(false);
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (editingReview) {
      const updatedReviews = reviews.map(review =>
        review.id === editingReview.id
          ? { ...newReview, id: review.id, date: review.date }
          : review
      );
      setReviews(updatedReviews);
      setEditingReview(null);
    } else {
      // Add new review
      const review = {
        ...newReview,
        date: new Date().toISOString(),
        id: Date.now(),
      };
      setReviews([review, ...reviews]);
    }
    setNewReview({ rating: 5, comment: '', name: '' });
  };

  const handleReviewDelete = (reviewId) => {
    const updatedReviews = reviews.filter(review => review.id !== reviewId);
    setReviews(updatedReviews);

    if (editingReview?.id === reviewId) {
      setEditingReview(null);
      setNewReview({ rating: 5, comment: '', name: '' });
    }
  };

  const handleEditClick = (review) => {
    setEditingReview(review);
    setNewReview({
      rating: review.rating,
      comment: review.comment,
      name: review.name || review.reviewerName
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({
      ...newReview,
      [name]: value
    });
  };

  const handleRatingChange = (newRating) => {
    setNewReview({
      ...newReview,
      rating: newRating
    });
  };

  const scrollRelated = (direction) => {
    if (relatedRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      relatedRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (loading) return <Loader />;
  if (!product) return <div className="error-message">Product not found</div>;

  return (
    <>
      <Navbar />
      <div className="description-container">
        <div className="product-details">
          <div className="image-gallery">
            <div className="main-image">
              <img src={product.images[selectedImage]} alt={product.title} />
            </div>
            <div className="thumbnails">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${product.title} - view ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="product-info">
            <h1>{product.title}</h1>
            <div className="brand">{product.brand}</div>

            <div className="rating-container">
              <Rating rating={product.rating} />
              <span className="rating-value">{product.rating.toFixed(1)}</span>
            </div>

            <div className="price-container">
              <div className="price">₹{product.price.toFixed(2)}</div>
            </div>

            <p className="description-text">{product.description}</p>

            {quantity > 0 ? (
              <div className="quantity-counter">
                <button
                  className="quantity-btn"
                  onClick={decreaseQuantity}
                >
                  <Minus size={16} />
                </button>
                <span className="quantity">{quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={increaseQuantity}
                  disabled={quantity >= product.stock}
                >
                  <Plus size={16} />
                </button>
              </div>
            ) : (
              <button
                className="add-to-cart"
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
              >
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            )}

            {addedToCart && (
              <div className="added-confirmation">
                Item added to cart!
              </div>
            )}
          </div>
        </div>

        <div className="reviews-section">
          <h2>Customer Reviews</h2>
          <div className="reviews-summary">
            <div className="average-rating">
              <Rating rating={product.rating} size="large" />
              <span className="rating-text">{product.rating.toFixed(1)} out of 5</span>
            </div>
            <div className="review-count">
              Based on {reviews.length} reviews
            </div>
          </div>

          <Form
            newReview={newReview}
            onInputChange={handleInputChange}
            onRatingChange={handleRatingChange}
            onSubmit={handleReviewSubmit}
            isEditing={!!editingReview}
          />

          <div className="reviews-list">
            {reviews.map((review, index) => (
              <div key={review.id || index} className="review-item">
                <div className="review-header">
                  <div className="review-author">
                    <span className="author-name">{review.reviewerName || review.name}</span>
                    <span className="review-date">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="review-actions">
                    <button
                      className="edit-review"
                      onClick={() => handleEditClick(review)}
                      aria-label="Edit review"
                    >
                      <PenLine size={22} />
                    </button>
                    <button
                      className="delete-review"
                      onClick={() => handleReviewDelete(review.id)}
                      aria-label="Delete review"
                    >
                      <Trash2 size={22} />
                    </button>
                  </div>
                </div>
                <Rating rating={review.rating} />
                <p className="review-comment">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="related-section">
          <div className="related-header">
            <h2>Related Products</h2>
            <div className="scroll-controls">
              <button className="scroll-btn" onClick={() => scrollRelated('left')}>
                <ChevronLeft size={20} />
              </button>
              <button className="scroll-btn" onClick={() => scrollRelated('right')}>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="related-products" ref={relatedRef}>
            {relatedProducts.map(item => (
              <Link to={`/product/${item.id}`} key={item.id} className="related-card">
                <div className="related-image">
                  <img src={item.thumbnail} alt={item.title} />
                </div>
                <div className="related-info">
                  <h3 className="related-title">{item.title}</h3>
                  <div className="related-price">₹{item.price.toFixed(2)}</div>
                  <div className="related-rating">
                    <Rating rating={item.rating} size="small" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Description;