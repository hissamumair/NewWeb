import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  places: {},
};

export const PlaceSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {

  },

});

export const {  } = PlaceSlice.actions;

export default PlaceSlice.reducer;