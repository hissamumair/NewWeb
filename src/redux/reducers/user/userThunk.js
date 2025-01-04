
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from "../../baseURL";  // Make sure this file exports the correct baseURL
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the userApi
export const userApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,  // Base URL pointing to your backend
    prepareHeaders: async (headers) => {
      const token = await AsyncStorage.getItem('token');  // Fetch token from AsyncStorage
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'CurrentLoginUser'],
  reducerPath: 'userApi',
  endpoints: (build) => ({
    // Existing endpoints for User
    registerUser: build.mutation({
      query: (user) => ({
        url: '/api/user/register',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),

    ForgotPassword: build.mutation({
      query: (user) => ({
        url: '/api/user/forget',
        method: 'POST',
        body: { email: user.email },
      }),
      invalidatesTags: ['User'],
    }),

    verifyOTP: build.mutation({
      query: (user) => ({
        url: '/api/user/verify-otp',
        method: 'POST',
        body: { email: user.email, otp: user.otp },
      }),
      invalidatesTags: ['User'],
    }),

    resetPassword: build.mutation({
      query: (user) => ({
        url: `/api/user/resetPass/${user.resetToken}`,
        method: 'POST',
        body: { password: user.password },
      }),
      invalidatesTags: ['User'],
    }),

    loginUser: build.mutation({
      query: (user) => ({
        url: '/api/user/login',
        method: 'POST',
        body: { email: user.email, password: user.password },
      }),
      invalidatesTags: ['User'],
    }),

    getCurrentUser: build.mutation({
      query: (user) => ({
        url: `/api/user/getCurrentUser/${user.userId}`,
        method: 'POST',
        body: {},
      }),
      invalidatesTags: ['User'],
    }),

    // New endpoints for User Management
    getAllUsers: build.query({
      query: () => ({
        url: '/api/user/getAll',  // Fetch all users
        method: 'GET',
      }),
      providesTags: ['User'],
    }),

    getDashboardStat: build.query({
      query: () => ({
        url: '/api/user/dashboard',  // Fetch dashboard statistics
        method: 'GET',
      }),
      providesTags: ['User'],
    }),

    addUser: build.mutation({
      query: (user) => ({
        url: `/api/user/register`,  // Create a new user
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),

    updateUserRole: build.mutation({
      query: ({ id, role }) => ({
        url: `/api/users/${id}/role`,  // Update user role
        method: 'PATCH',
        body: { role },
      }),
      invalidatesTags: ['User'],
    }),

    updateUser: build.mutation({
      query: (user) => ({
        url: `/api/user/${user._id}/update`,  // Update user
        method: 'PUT',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    

    deleteUser: build.mutation({
      query: (id) => ({
        url: `/api/user/${id}`,  // Delete a user by ID
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

// Export hooks for each endpoint
export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useForgotPasswordMutation,
  useVerifyOTPMutation,
  useResetPasswordMutation,
  useGetCurrentUserMutation,
  // New hooks for user management
  useGetAllUsersQuery,
  useAddUserMutation,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetDashboardStatQuery,
} = userApi;
