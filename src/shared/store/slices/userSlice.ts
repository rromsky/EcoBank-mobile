import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
type PersonalData = {
  email: string
  surname: string
  name: string
  address: string
}
export type User = {
  personalData?: PersonalData
  displayName: string | null
  uid: string
  phoneNumber: string | null
  email: string | null
  photoURL: string | null
  emailVerified?: boolean
  isOnboarded?: boolean
  marketData: {
    favouriteItems: string[]
  }
}

export interface UserSliceState {
  user: User | null
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
    userSet: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    userUpdateOnboarding: (state) => {
      state.isOnboarded = true
    },
    userLogout: (state) => {
      state.user = null
    },
    updateUserPersonalData: (state, action: PayloadAction<PersonalData>) => {
      if (state.user) state.user.personalData = action.payload
    },
    userUpdateFavouriteList: (state, action: PayloadAction<string[]>) => {
      if (state.user) state.user.marketData.favouriteItems = action.payload
    },
  },
})

export const { userLogout, userUpdateFavouriteList, updateUserPersonalData, userSet, userUpdateOnboarding } =
  userSlice.actions

export default userSlice.reducer
