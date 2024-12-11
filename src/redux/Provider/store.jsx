import { configureStore } from '@reduxjs/toolkit';
import userReducer  from '../Reducers/users/userReducer';
import { userApi } from '../Reducers/users/userThunk';

const store = configureStore({
  reducer: {
    user: userReducer,      // Your userSlice reducer
    [userApi.reducerPath]: userApi.reducer, // Add the userApi reducer to the store
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware), // Add the API middleware
});

export default store;
