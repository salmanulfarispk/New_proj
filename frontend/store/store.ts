import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "@/features/ProductSlice"
import CartReducer from "@/features/CartSlice"
import userReducer from "@/features/userSlice"


const store= configureStore({
    reducer:{
      products: ProductReducer,
      cart: CartReducer,
      user:userReducer
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;