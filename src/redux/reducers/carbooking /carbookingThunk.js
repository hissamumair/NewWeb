import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '../../baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const carbookingApi = createApi({
  reducerPath: 'carbookingApi',
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
  endpoints: (build) => ({
    getAllCarBookingsForUser: build.query({
      query: (userId) => `/api/car-booking/getAllCarBookingForUser/${userId}`,
      providesTags: ['Booking'],
    }),
    createCarBooking: build.mutation({
      query: (bookingData) => ({
        url: '/api/car-booking/create',
        method: 'POST',
        body: bookingData,
      }),
      invalidatesTags: ['Booking'],
    }),
  }),
});

export const {
  useGetAllCarBookingsForUserQuery,
  useCreateCarBookingMutation,
  
} = carbookingApi;
