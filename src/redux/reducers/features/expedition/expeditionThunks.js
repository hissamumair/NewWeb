import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const expeditionApi = createApi({
  reducerPath: 'expeditionApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Expedition'],
  endpoints: (builder) => ({
    getExpeditions: builder.query({
      query: () => '/expeditions',
      providesTags: ['Expedition'],
    }),
    addExpedition: builder.mutation({
      query: (expeditionData) => ({
        url: '/expeditions',
        method: 'POST',
        body: expeditionData,
      }),
      invalidatesTags: ['Expedition'],
    }),
    updateExpedition: builder.mutation({
      query: ({ id, ...expeditionData }) => ({
        url: `/expeditions/${id}`,
        method: 'PUT',
        body: expeditionData,
      }),
      invalidatesTags: ['Expedition'],
    }),
    deleteExpedition: builder.mutation({
      query: (id) => ({
        url: `/expeditions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Expedition'],
    }),
  }),
});

export const {
  useGetExpeditionsQuery,
  useAddExpeditionMutation,
  useUpdateExpeditionMutation,
  useDeleteExpeditionMutation,
} = expeditionApi;