import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../baseURL";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const userApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: async (headers, { getState }) => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "CurrentLoginUser"],
  reducerPath: "userApi",
  endpoints: build => ({
    // Existing endpoints
    registerUser: build.mutation({
      query: user => ({
        url: `/api/user/register`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    ForgotPassword: build.mutation({
      query: user => ({
        url: `/api/user/forget`,
        method: "POST",
        body: {
          email: user.email,
        },
      }),
      invalidatesTags: ["User"],
    }),
    verifyOTP: build.mutation({
      query: user => ({
        url: `/api/user/verify-otp`,
        method: "POST",
        body: {
          email: user.email,
          otp: user.otp,
        },
      }),
      invalidatesTags: ["User"],
    }),
    resetPassword: build.mutation({
      query: user => ({
        url: `/api/user/resetPass/${user.resetToken}`,
        method: "POST",
        body: {
          password: user.password,
        },
      }),
      invalidatesTags: ["User"],
    }),
    loginUser: build.mutation({
      query: user => ({
        url: `/api/user/login`,
        method: "POST",
        body: {
          email: user.email,
          password: user.password,
        },
      }),
      invalidatesTags: ["User"],
    }),
    getCurrentUser: build.mutation({
      query: user => ({
        url: `/api/user/getCurrentUser/${user.userId}`,
        method: "POST",
        body: {},
      }),
      invalidatesTags: ["User"],
    }),
    // New endpoints needed for UserManagement.js
    getUsers: build.query({
      query: () => ({
        url: '/api/users',
        method: 'GET'
      }),
      providesTags: ['User']
    }),
    getDashboardStat: build.query({
      query: () => ({
        url: '/api/user/dashboard',
        method: 'GET'
      }),
      providesTags: ['User']
    }),
    addUser: build.mutation({
      query: (user) => ({
        url: '/api/users',
        method: 'POST',
        body: user
      }),
      invalidatesTags: ['User']
    }),
    updateUserRole: build.mutation({
      query: ({ id, role }) => ({
        url: `/api/users/${id}/role`,
        method: 'PATCH',
        body: { role }
      }),
      invalidatesTags: ['User']
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/api/users/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['User']
    })
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useForgotPasswordMutation,
  useVerifyOTPMutation,
  useResetPasswordMutation,
  useGetCurrentUserMutation,
  // New exports
  useGetUsersQuery,
  useAddUserMutation,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
  useGetDashboardStatQuery
} = userApi;