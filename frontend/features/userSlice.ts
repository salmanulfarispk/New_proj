import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  name: string;
  email: string;
  password: string;
  currentState: 'Login' | 'Sign Up';

}

const initialState: AuthState = {
  name: '',
  email: '',
  password: '',
  currentState: 'Sign Up',
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
      setCurrentState(state) {
      state.currentState = state.currentState === 'Login' ? 'Sign Up' : 'Login';
    },
    
  },
});

export const {
  setName,
  setEmail,
  setPassword,
  setCurrentState,
} = authSlice.actions;

export default authSlice.reducer;
