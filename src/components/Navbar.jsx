import { useCallback, useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import Auth from './pages/auth/Auth';
import { ShoppingCart } from 'lucide-react';
import logo from '../assets/logo.png';
import Cart from './pages/Cardpage/Cart';
// Order Confirmation Page
import Confirmation from './pages/Cardpage/Confirmation';
// import Terms from './Terms';
import Terms from './pages/Terms';
import { useDispatch, useSelector } from 'react-redux';
// Redux
import { clearCart, updateQuantity, removeFromCart, loadCartFromStorage } from '../features/user/userSlice';
// import {  } from '../features/user/userSlice';


const Navbar = ({ setPriceFilter, setRatingFilter, setSearchQuery }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('isLoggedIn') === 'true';
  });

  const [isCart, setIsCart] = useState(false);
  const [isConfirmation, setIsConfirmation] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  const [showTerms, setShowTerms] = useState(false);

  const dispatch = useDispatch()
  // const data = useSelector((state)=>state.user.cartItems)
  // setCartItems(data)
  const cartItems = useSelector((state) => state.user.cart);
  // console.log(cartItems)


  useEffect(() => {
    if (isLoggedIn) {
      sessionStorage.setItem('isLoggedIn', 'true');
    } else {
      sessionStorage.removeItem('isLoggedIn');
    }
  }, [isLoggedIn]);


  // useEffect(() => {
  //   const savedCart = localStorage.getItem('cartItems');
  //   if (savedCart) {
  //     try {
  //       setCartItems(JSON.parse(savedCart));
  //     } catch (e) {
  //       console.error("Error parsing cart items from localStorage", e);
  //     }
  //   }
  // }, []);
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      // cart: [{ 1: 4 }, { 9: 24 }]
      try {
        const localCartData = JSON.parse(savedCart);

        if (localCartData.quantity > 0) dispatch(loadCartFromStorage(localCartData));
        else localStorage.removeItem('cartItems');
      } catch (e) {

        console.error("Error parsing cart items from localStorage", e);
      }
    }
  }, [dispatch]);



  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleLoginClick = useCallback(() => {

    setShowTerms(true);
  }, []);

  const handleAcceptTerms = useCallback(() => {
    Auth();
    setIsLoggedIn(true);
  }, []);

  const handleCartClick = () => {
    setIsCart(true);
  };

  const closeCart = () => {
    setIsCart(false);
  };

  // global window function 

  // const addToCart = (product, quantity) => {
  //   const existingItem = cartItems.find(item => item.id === product.id);

  //   if (existingItem) {
  //     updateQuantity(product.id, existingItem.quantity + quantity);
  //   } else {
  //     setCartItems([...cartItems, { ...product, quantity }]);
  //   }
  // };


  // window.addToCart = addToCart;


  // const removeFromCart = (itemId) => {
  //   setCartItems(cartItems.filter(item => item.id !== itemId));
  // };
  const HandleremoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  // const updateQuantity = (itemId, newQuantity) => {
  //   setCartItems(cartItems.map(item => 
  //     item.id === itemId ? { ...item, quantity: newQuantity } : item
  //   ));
  // };
  const HandleupdateQuantity = (itemId, newQuantity) => {
    dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
  };

  // const handleCheckout = () => {
  //   closeCart();
  //   setIsConfirmation(true);
  //   setTimeout(() => {
  //     setCartItems([]);
  //   }, 1000);
  // };
  const handleCheckout = () => {
    closeCart();
    setIsConfirmation(true);
    setTimeout(() => {
      dispatch(clearCart());
    }, 1000);
  };


  const closeOrderConfirmation = () => {
    setIsConfirmation(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('isLoggedIn');

  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
          <h1 className="app-name">Product Fetcher</h1>
        </div>

        <div className="navbar-center">
          <input
            type="text"
            placeholder="Search products..."
            className="search-input"
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
          />
        </div>

        <div className="navbar-right">
          <select
            className="filter-select"
            onChange={(e) => setPriceFilter && setPriceFilter(e.target.value)}
          >
            <option value=""> Price</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>

          <select
            className="filter-select"
            onChange={(e) => setRatingFilter && setRatingFilter(e.target.value)}
          >
            <option value=""> Rating</option>
            <option value="highToLow">High to Low</option>
            <option value="lowToHigh">Low to High</option>
          </select>

          {isLoggedIn ? (
            <>
              <button className="cart-button" onClick={handleCartClick}>
                <ShoppingCart size={30} />
                {cartItems.length > 0 && (
                  <span className="cart-count">{cartItems.length}</span>
                )}
              </button>
              <button className="login" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <button className="login" onClick={handleLoginClick}>
              Login
            </button>
          )}
        </div>
      </nav>


      <Terms
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
        onAccept={handleAcceptTerms}
      />

      <Cart
        isOpen={isCart}
        onClose={closeCart}
        cartItems={cartItems}
        removeFromCart={HandleremoveFromCart}
        updateQuantity={HandleupdateQuantity}
        onCheckout={handleCheckout}
      />

      <Confirmation
        isOpen={isConfirmation}
        onClose={closeOrderConfirmation}
      />
    </>
  );
};

export default Navbar;