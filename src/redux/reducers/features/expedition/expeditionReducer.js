import { createSlice } from '@reduxjs/toolkit';
import {
  fetchExpeditions,
  createExpedition,
  updateExpedition,
  deleteExpedition,
} from '../thunks/expeditionThunks';

const initialState = {
  expeditions: [],
  currentExpedition: null,
  loading: false,
  error: null,
  success: false,
};

const expeditionSlice = createSlice({
  name: 'expeditions',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    setCurrentExpedition: (state, action) => {
      state.currentExpedition = action.payload;
    },
    clearCurrentExpedition: (state) => {
      state.currentExpedition = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Expeditions
    builder
      .addCase(fetchExpeditions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpeditions.fulfilled, (state, action) => {
        state.loading = false;
        state.expeditions = action.payload;
        state.error = null;
      })
      .addCase(fetchExpeditions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    // Create Expedition
    builder
      .addCase(createExpedition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createExpedition.fulfilled, (state, action) => {
        state.loading = false;
        state.expeditions.push(action.payload);
        state.success = true;
        state.error = null;
      })
      .addCase(createExpedition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    // Update Expedition
    builder
      .addCase(updateExpedition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExpedition.fulfilled, (state, action) => {
        state.loading = false;
        state.expeditions = state.expeditions.map((expedition) =>
          expedition.id === action.payload.id ? action.payload : expedition
        );
        state.success = true;
        state.error = null;
      })
      .addCase(updateExpedition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    // Delete Expedition
    builder
      .addCase(deleteExpedition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExpedition.fulfilled, (state, action) => {
        state.loading = false;
        state.expeditions = state.expeditions.filter(
          (expedition) => expedition.id !== action.payload
        );
        state.success = true;
        state.error = null;
      })
      .addCase(deleteExpedition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  clearSuccess,
  setCurrentExpedition,
  clearCurrentExpedition,
  
} = expeditionSlice.actions;

export default expeditionSlice.reducer;
