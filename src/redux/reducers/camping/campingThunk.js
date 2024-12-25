import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '../../baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const campingApi = createApi({
  reducerPath: 'campingApi', 
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
  tagTypes: ['Camping'], 
  endpoints: (build) => ({
    getAllCampings: build.query({
      query: () => `/api/camping`,
      providesTags: ["Camping"], // use the tag type that matches the endpoints
    }),
    getCampingByPlaceId: build.query({
      query: (placeId) => `/api/camping/getCampByPlaceId/${placeId}`,
      providesTags: ["Camping"],
    }),
  }),
});

// Export hooks for each endpoint
export const {
  useGetAllCampingsQuery,
  useGetCampingByPlaceIdQuery
} = campingApi;
