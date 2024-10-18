import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ItemCategory, ItemType } from 'shared/types'

export interface cartSliceType {
  isButtonShown: boolean
  totalPrice: number
  items: ItemType[]
  displayedItems: ItemType[]
  searchedItems: ItemType[]
  searchString: string
  isFiltered: boolean
  activeFilteredCategory: string[]
}

const initialState: cartSliceType = {
  activeFilteredCategory: [],
  displayedItems: [],
  isButtonShown: false,
  isFiltered: false,
  items: [],
  searchString: '',
  searchedItems: [],
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
    cartGlobalSetItems: (state: cartSliceType, action: PayloadAction<ItemType[]>) => {
      state.items = action.payload
      state.displayedItems = action.payload
    },
  },
})
export const { cartGlobalSetItems, cartClean, cartAddItem, cartRemoveItem } = cartSlice.actions
export default cartSlice.reducer
