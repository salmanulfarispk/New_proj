import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./slices/ProductSlice"


const store= configureStore({
    reducer:{
      products: ProductReducer
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;