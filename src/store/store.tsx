import { configureStore } from '@reduxjs/toolkit';
import currentUserReducer  from '../features/homepageSlice';

export const store = configureStore({
  reducer: {
    userData: currentUserReducer 
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
