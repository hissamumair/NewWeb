import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentLoginUser: {},
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    handleCurrentLoaginUser: (state, action) => {
      state.currentLoginUser = action.payload
    },

  },

});

// Action creators are generated for each case reducer function
export const { handleCurrentLoaginUser } = UserSlice.actions;

export default UserSlice.reducer;