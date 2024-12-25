import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  camping: {},
};

export const CampingSlice = createSlice({
  name: 'camping',
  initialState,
  reducers: {

  },

});

export const {  } = CampingSlice.actions;

export default CampingSlice.reducer;