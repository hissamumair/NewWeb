import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '../../baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
// register new user

export const placeApi = createApi({
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
  tagTypes: ['Place'],
  reducerPath: 'placeApi',
  endpoints: build => ({
    getAllPlaces: build.query({
      query: () => `/api/place`,

      providesTags: ["Place"],
    }),
    getplaceById: build.query({
      query: (expeditionId) => `/api/place/${expeditionId}`, // Use expeditionId here
      providesTags: ["Place"],
    }),
  }),
});

export const {
  useGetAllPlacesQuery,
  useGetplaceByIdQuery,
} = placeApi;