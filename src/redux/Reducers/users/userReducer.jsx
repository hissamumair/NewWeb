// userSlice.js (Redux slice)
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,  // Default value
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthenticated: (state) => {
      state.isAuthenticated = true;  // Set isAuthenticated to true
    },
    setUnauthenticated: (state) => {
      state.isAuthenticated = false;  // Set isAuthenticated to false
    },
  },
});

export const { setAuthenticated, setUnauthenticated } = userSlice.actions;
export default userSlice.reducer;
