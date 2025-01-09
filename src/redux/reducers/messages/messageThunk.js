import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../baseURL";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const messageApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: async (headers) => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Message", "Group", "User"],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: ({ receiverId, senderId }) => `/api/chat/${receiverId}/${senderId}`, // Updated path
   }),
    getAllChats: builder.query({
      query: () =>
        `/api/chat/getAllChats`,

    }),

    sendMessage: builder.mutation({
      query: (data) => ({
        url: "/api/chat/send",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { groupId }) => [
        { type: "Message", id: groupId },
      ],
    }),

  
  }),
});

export const {
  useGetMessagesQuery,
  useSendMessageMutation,
  useGetAllChatsQuery,
} = messageApi;
