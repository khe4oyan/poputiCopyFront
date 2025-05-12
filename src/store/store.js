import { configureStore } from '@reduxjs/toolkit';
import newRideSlice from './slices/newRideSlice';

const store = configureStore({
  reducer: {
    newRideSlice,
  },
});

export default store;