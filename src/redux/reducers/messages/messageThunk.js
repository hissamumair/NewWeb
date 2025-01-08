import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '../../baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const messageApi = createApi({
  reducerPath: 'api', // The key to store API state in the Redux store
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
  tagTypes: ['Message', 'Group', 'User'], // Tags for cache management
  endpoints: (builder) => ({
    // Fetch all messages for a group (Update query path to match backend)
    getMessages: builder.query({
      query: ({ receiverId, senderId }) => `/api/chat/${receiverId}/${senderId}`, // Updated path
      providesTags: (result, error, { senderId }) => [{ type: 'Message', id: senderId }],
    }),

    // Send a new message (Update query path to match backend)
    sendMessage: builder.mutation({
      query: ({ groupId, text }) => ({
        url: '/chat/send', // Updated path
        method: 'POST',
        body: { groupId, text },
      }),
      invalidatesTags: (result, error, { groupId }) => [{ type: 'Message', id: groupId }],
    }),

    // Delete messages
    deleteMessages: builder.mutation({
      query: (messageIds) => ({
        url: '/chat/delete',
        method: 'DELETE',
        body: { messageIds },
      }),
      invalidatesTags: ['Message'],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useSendMessageMutation,
  useDeleteMessagesMutation,
} = messageApi;
