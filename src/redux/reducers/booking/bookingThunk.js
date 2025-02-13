import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '../../baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const bookingApi = createApi({
  reducerPath: 'bookingApi', 
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: async (headers,) => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Booking'], 
  endpoints: (build) => ({
    getAllBookingsForUser: build.query({
      query: (userId) => `/api/booking/getAllBookingForUser/${userId}`,
      providesTags: ["Booking"], 
    }),
    getAllBookings: build.query({
      query: () => `/api/booking`,
      providesTags: ["Booking"], 
    }),
    createBooking: build.mutation({
      query: (bookingData) => ({
        url: '/api/booking/create', 
        method: 'POST',
        body: bookingData, 
      }),
      invalidatesTags: ['Booking'],
    }),
    updateBooking: build.mutation({
      query: (bookingData) => ({
        url: `/api/booking/${bookingData.id}`,
        method: 'PUT',
        body: bookingData,
      }),
      invalidatesTags: ['Booking'],
    }),
    deleteBooking: build.mutation({
      query: (bookingId) => ({
        url: `/api/booking/${bookingId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Booking'],
    }),
  }),
});

// Export hooks for each endpoint
export const {
  useGetAllBookingsForUserQuery,
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
  useGetAllBookingsQuery,
} = bookingApi;
