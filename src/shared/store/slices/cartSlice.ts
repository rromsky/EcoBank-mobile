import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ItemType } from 'src/processes/market/screens/types.ts'

export interface cartSliceType {
  isButtonShown: boolean
  totalPrice: number
  items: ItemType[]
  isFiltered: boolean
  activeFilteredCategory: string[]
}

const initialState: cartSliceType = {
  activeFilteredCategory: [],
  items: [],
  isButtonShown: false,
  isFiltered: false,
  totalPrice: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cartAddItem: (state: cartSliceType, action: PayloadAction<ItemType>) => {
      state.items.push(action.payload)
      state.totalPrice += action.payload.price
      if (!state.isButtonShown) state.isButtonShown = true
    },
    cartRemoveItem: (state: cartSliceType, action: PayloadAction<string>) => {
      let removedPrice = 0

      const newItemList = state.items.filter((el) => {
        removedPrice += el.price
        return el.code !== action.payload
      })
      state.totalPrice -= removedPrice
      state.items = newItemList

      if (!state.items.length) state.isButtonShown = false
    },
    cartClean: (state: cartSliceType) => {
      state.items = []
      state.totalPrice = 0
      state.isButtonShown = false
    },
  },
})
export const { cartClean, cartAddItem, cartRemoveItem } = cartSlice.actions
export default cartSlice.reducer
