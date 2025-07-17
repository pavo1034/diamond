import { configureStore } from '@reduxjs/toolkit';
import brokerReducer from './brokerSlice'; 
import diamondReducer from './diamondSlice'; 

export const store = configureStore({
  reducer: {
    brokers: brokerReducer,
    diamonds:diamondReducer,
  },
});
