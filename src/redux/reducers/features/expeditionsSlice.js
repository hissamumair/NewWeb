// features/expeditionsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const expeditionsSlice = createSlice({
  name: 'expeditions',
  initialState: {
    expeditions: [
      {
        id: '1',
        title: 'K2',
        description: 'K2, the second-highest mountain in the world, towers at 8,611 meters (28,251 feet)..',
        price: 'PKR 15,000',
        source: require('../../../assets/icons/k2.png'),
      },
      {
        id: '2',
        title: 'Karakorum',
        description: 'Karakoram is a mountain range in Pakistan..',
        price: 'PKR 15,000',
        source: require('../../../assets/icons/parbat.png'),
      },
      {
        id: '3',
        title: 'K2',
        description: 'K2, the second-highest mountain in the world, towers at 8,611 meters (28,251 feet)..',
        price: 'PKR 15,000',
        source: require('../../../assets/icons/parbat.png'),
      },
      {
        id: '4',
        title: 'Karakorum',
        price: 'PKR 15,000',
        source: require('../../../assets/icons/k2.png'),
      },
      {
        id: '5',
        title: 'K2',
        price: 'PKR 15,000',
        source: require('../../../assets/icons/parbat.png'),
      },
    ],
  },
  reducers: {},
});

export const selectExpeditions = (state) => state.expeditions.expeditions;

export default expeditionsSlice.reducer;
