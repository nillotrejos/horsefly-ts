import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface userState {
  value: any
}

const initialState: userState = {
  value: [],
}

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUserLocation: (state, action: PayloadAction<any>) => {
        state.value = ([...state.value, action.payload.data])
      },
  
  },
})

export const { setCurrentUserLocation} = currentUserSlice.actions

export default currentUserSlice.reducer