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
        console.log(action,'action');
        state.value = ([...state.value, action.payload.data])
      },
  
  },
})

// Action creators are generated for each case reducer function
export const { setCurrentUserLocation} = currentUserSlice.actions

export default currentUserSlice.reducer