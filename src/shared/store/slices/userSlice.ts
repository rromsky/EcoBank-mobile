import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserSliceState {
  user: any
  isOnboarded?: boolean
}

const initialState: UserSliceState = {
  user: null,
  isOnboarded: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userSet: (state, action: PayloadAction<any>) => {
      state.user = action.payload
    },
    userUpdateOnboarding: (state) => {
      state.isOnboarded = true
    },
    userLogout: (state) => {
      state.user = null
    },
  },
})

export const { userLogout, userSet, userUpdateOnboarding } = userSlice.actions

export default userSlice.reducer
