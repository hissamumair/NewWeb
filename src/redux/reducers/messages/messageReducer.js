import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hikings: {},
};

export const MessageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {

  },

});

export const {  } = MessageSlice.actions;

export default MessageSlice.reducer;