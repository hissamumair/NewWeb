import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  carbooking: {},  
  loading: false,  
  error: null,     
};

export const carbookingSlice = createSlice({
  name: 'carbooking',
  initialState,
  reducers: {
    startBooking: (state) => {
      state.loading = true;
      state.error = null;  
    },
    setBooking: (state, action) => {
      state.carbooking = action.payload;  
      state.loading = false;  
    },
    setBookingError: (state, action) => {
      state.error = action.payload;  
      state.loading = false;  
    },
    clearBooking: (state) => {
      state.carbooking = {};  
    },
  },
});

export const { startBooking, setBooking, setBookingError, clearBooking } = carbookingSlice.actions;

export default carbookingSlice.reducer;
