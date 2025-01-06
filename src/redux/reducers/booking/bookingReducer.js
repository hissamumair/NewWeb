import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trips: [],  // List of available trips
  selectedTrip: null,  // Currently selected trip
  bookingStatus: 'idle',  // Booking status: 'idle', 'loading', 'success', 'failed'
  bookingError: null,  // Error message if any
  bookedTrips: [],  // List of user's booked trips
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setTrips: (state, action) => {
      state.trips = action.payload;
    },
    setSelectedTrip: (state, action) => {
      state.selectedTrip = action.payload;
    },
    setBookingStatus: (state, action) => {
      state.bookingStatus = action.payload;
    },
    setBookingError: (state, action) => {
      state.bookingError = action.payload;
    },
    addBookedTrip: (state, action) => {
      state.bookedTrips.push(action.payload);
    },
  },
});

export const { setTrips, setSelectedTrip, setBookingStatus, setBookingError, addBookedTrip } = bookingSlice.actions;

export default bookingSlice.reducer;
