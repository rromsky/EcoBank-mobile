import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserSliceState {
  user: any
}

const initialState: UserSliceState = {
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userSet: (state, action: PayloadAction<any>) => {
      state.user = action.payload
    },
    userUpdatePhoto: (state, action) => {
      state.user.photoURL = action.payload
    },
    userUpdateName: (state, action) => {
      state.user.displayName = action.payload
    },
    userUpdateFavoriteList: (state, action) => {
      state.user.favoriteList = action.payload
    },
    userUpdateOnboarding: (state) => {
      state.user.isOnboarded = true
    },
    userUpdateField: (state, action) => {
      state.user[action.payload.field] = action.payload.value
    },
    userLogout: (state) => {
      state.user = null
    },
  },
})

export const {
  userLogout,
  userSet,
  userUpdateField,
  userUpdateName,
  userUpdateFavoriteList,
  userUpdatePhoto,
  userUpdateOnboarding,
} = userSlice.actions

export default userSlice.reducer
