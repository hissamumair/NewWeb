import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '../../baseURL';
export const userApi = createApi({
  reducerPath: 'userApi', // Unique name for the API slice reducer
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }), // API base URL
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: ({ username, password }) => ({
        url: '/api/user/login', 
        method: 'POST',
        body: { username, password }, 
      }),
    }),
  }),
});

export const { useLoginUserMutation } = userApi;
