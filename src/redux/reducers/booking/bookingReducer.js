// bookingSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '../../baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Slice for local state management
const bookingReducer = createSlice({
  name: 'booking',
  initialState: {
    booking: {},
    currentBooking: null,
  },
  reducers: {
    setCurrentBooking: (state, action) => {
      state.currentBooking = action.payload;
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
    },
  },
});

// API slice for server interactions
export const bookingApi = createApi({
  reducerPath: 'bookingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: async (headers, { getState }) => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Booking'],
  endpoints: (builder) => ({
    getAllBookingsForUser: builder.query({
      query: (userId) => `/api/booking/getAllBookingForUser/${userId}`,
      providesTags: ['Booking'],
    }),
    getBookingById: builder.query({
      query: (bookingId) => `/api/booking/${bookingId}`,
      providesTags: ['Booking'],
    }),
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: '/api/booking/create',
        method: 'POST',
        body: bookingData,
      }),
      invalidatesTags: ['Booking'],
    }),
    updateBooking: builder.mutation({
      query: ({ bookingId, ...updateData }) => ({
        url: `/api/booking/${bookingId}`,
        method: 'PUT',
        body: updateData,
      }),
      invalidatesTags: ['Booking'],
    }),
    deleteBooking: builder.mutation({
      query: (bookingId) => ({
        url: `/api/booking/${bookingId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Booking'],
    }),
  }),
});

// Export actions from the slice
export const { setCurrentBooking, clearCurrentBooking } = bookingReducer.actions;

// Export hooks for the API endpoints
export const {
  useGetAllBookingsForUserQuery,
  useGetBookingByIdQuery,
  useCreateBookingMutation, // This is the correct name to use instead of useAddBookingMutation
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingApi;

// Export the reducer
export default bookingReducer.reducer;