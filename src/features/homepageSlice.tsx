import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface userState {
  location: any;
  resultData: any;
}

const initialState: userState = {
  location: [],
  resultData: []
};

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUserLocation: (state, action: PayloadAction<any>) => {
      state.location = [...state.location, action.payload.data];
    },
    resultData: (state, action: PayloadAction<any>) => {
      state.resultData = [...state.resultData, action.payload.data];
    }
  }
});

export const { setCurrentUserLocation, resultData } = currentUserSlice.actions;

export default currentUserSlice.reducer;
