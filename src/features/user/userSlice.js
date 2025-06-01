

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const userSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // addToCart: (state, action) => {
    //   const { productId, quantity } = action.payload;

    //   console.log({ productId, qq: quantity })
    //   // pid= 8; quantity : 4, cart = [];
    //   // cart [{4 : 8 },{9 : 18 }]  
    //   // const products = cart.map(val => Object.keys(val)[0] ).map(pid => findSingleProduct(id))
    //   // const index = state.cart.findIndex(val => (Object.keys(val)[0] == String(productId)));
    //   const index = state.cart.findIndex(val => Number(Object.keys(val)[0]) === productId);

    //   console.log(index)
    //   if (index !== -1) {
    //     state.cart[index][productId] = quantity
    //   } else {
    //     state.cart = [...state.cart, { [productId]: quantity }]
    //   }
    // },
    
       addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItem = state.cart.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cart.push({ ...product, quantity });
      }
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cart.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cart = state.cart.filter(item => item.id !== id);
    },

    clearCart: (state) => {
      state.cart = [];
    },

    loadCartFromStorage: (state, action) => {
      state.cart = action.payload;
    }

  }
});

export const { addToCart, updateQuantity, removeFromCart, clearCart, loadCartFromStorage } = userSlice.actions;
export default userSlice.reducer;
