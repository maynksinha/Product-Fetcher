import React from 'react';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import './Cart.css';

const Cart = ({ isOpen, onClose, cartItems, removeFromCart, updateQuantity, onCheckout }) => {
  if (!isOpen) return null;
const product = cartItems
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="cart-overlay">
      <div className="cart-container">
        <div className="cart-header">
          <div className="cart-title">
            <ShoppingBag size={20} />
            <h2>Your Cart</h2>
          </div>
          <button className="close-cart" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={48} />
              <p>Your cart is empty</p>
              <button className="continue-shopping" onClick={onClose}>Continue Shopping</button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div className="cart-item\" key={item.id}>
                    <div className="item-image">
                      <img
                        src={
                          item.thumbnail ||
                          (item.images && Array.isArray(item.images) && item.images.length > 0
                            ? item.images[0]
                            : 'https://via.placeholder.com/100')
                        }
                        alt={item.title}
                      />
                    </div>
                    <div className="item-details">
                      <div className="item-title">{item.title}</div>
                      <div className="item-price">₹{Number(item.price).toFixed(2)}</div>
                      <div className="item-controls">
                        <div className="quantity-control">
                          <button 
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            disabled={item.quantity <= 1}
                          >-</button>
                          <span>{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, Math.min(item.stock, item.quantity + 1))}
                            disabled={item.quantity >= item.stock}
                          >+</button>
                        </div>
                        <button 
                          className="remove-item" 
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="cart-total">
                  <span>Total</span>
                  <span>₹{calculateTotal()}</span>
                </div>
                <button className="checkout-button" onClick={onCheckout}>
                  Confirm Order
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;