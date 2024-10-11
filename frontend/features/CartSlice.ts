import { Products } from "@/utils/datas";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Dispatch } from "redux"; 

interface CartState {
  cartItems: {
    [itemId: string]: {
      [size: string]: number;
      [quantity: number]:number;
    };
  };
}

const initialState: CartState = {
  cartItems: {}
};

const CartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    setCartItems(state, action: PayloadAction<CartState['cartItems']>) {
      state.cartItems = action.payload;
    }
  }
});

export const { setCartItems } = CartSlice.actions;



//redux takes this as a middleware 

export const addToCart = (itemId: string, size: string) => (dispatch: Dispatch, getState: () => { cart: CartState }) => {
  const cartItems = getState().cart.cartItems; ///getting the current cart items
  const cartData = structuredClone(cartItems);  // Create a copy of the cart items

    if(!size){
        toast.error('Select product Size')
        return;
    }
  if (cartData[itemId]) {
    if (cartData[itemId][size]) {
      cartData[itemId][size] += 1; 
    } else {
      cartData[itemId][size] = 1; 
    }
  } else {
    cartData[itemId] = { [size]: 1 }; 
  }

  dispatch(setCartItems(cartData));
};


export const getCartCount = (state: { cart: CartState }) => {
    let totalCount = 0;
    const cartItems = state.cart.cartItems;
  
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        try {
          if (cartItems[itemId][size] > 0) {
            totalCount += cartItems[itemId][size];
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  
    return totalCount;
  };

  export const getCartAmount = (state: { cart: CartState }) => {
    let totalAmount = 0;
    const cartItems = state.cart.cartItems;
  
    for (const itemId in cartItems) {
      const itemInfo = Products.find((product) => product.id === itemId);
      if (itemInfo) {
        for (const quantity in cartItems[itemId]) {
          try {
            if (cartItems[itemId][quantity] > 0) {
              totalAmount += itemInfo.price * cartItems[itemId][quantity]; 
            }
          } catch (error) {
            console.error(error);
          }
        }
      }
    }
  
    return totalAmount;
  };
  





export default CartSlice.reducer;
