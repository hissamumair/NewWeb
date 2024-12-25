import { configureStore } from "@reduxjs/toolkit";

// User imports
import userReducer from "./reducers/user/userReducer";
import { userApi } from "./reducers/user/userThunk";

// Place imports
import placeReducer from "./reducers/places/placeReducer";
import { placeApi } from "./reducers/places/placeThunk";

// Booking imports
import bookingReducer, { bookingApi } from "./reducers/booking/bookingReducer";
import { carbookingApi } from "./../redux/reducers/carbooking /carbookingThunk";

// Configure store with all reducers and middleware
const store = configureStore({
  reducer: {
    // Regular reducers
    user: userReducer,
    place: placeReducer,
    booking: bookingReducer,
    carBooking: carbookingApi.reducer, // Corrected this line

    // API reducers
    [userApi.reducerPath]: userApi.reducer,
    [placeApi.reducerPath]: placeApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    [carbookingApi.reducerPath]: carbookingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      userApi.middleware,
      placeApi.middleware,
      bookingApi.middleware,
      carbookingApi.middleware,
    ]),
});

export default store;
