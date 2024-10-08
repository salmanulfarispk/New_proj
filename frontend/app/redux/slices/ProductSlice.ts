import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Products } from '@/utils/datas';  


interface ProductState {
  allProducts: typeof Products; 
  showFilter: boolean;
  category: string[];
  subcategory: string[];
  sortType: string;
}

const initialState: ProductState = {
  allProducts: Products,
  showFilter: false,
  category: [],
  subcategory: [],
  sortType: 'relavent', 
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setAllProducts(state, action: PayloadAction<typeof Products>) {
      state.allProducts = action.payload;
    },
    toggleShowFilter(state) {
      state.showFilter = !state.showFilter;
    },
    setCategory(state, action: PayloadAction<string[]>) {
      state.category = action.payload;
    },
    setSubCategory(state, action: PayloadAction<string[]>) {
      state.subcategory = action.payload;
    },
    setSortType(state, action: PayloadAction<string>) {
      state.sortType = action.payload;
    },
  },
});

export const {
  setAllProducts,
  toggleShowFilter,
  setCategory,
  setSubCategory,
  setSortType,
} = productSlice.actions;

export default productSlice.reducer;
