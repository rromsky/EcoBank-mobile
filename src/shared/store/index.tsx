import { useSelector, type TypedUseSelectorHook, useDispatch } from 'react-redux'

export * from './slices/userSlice'
export * from './slices/cartSlice'
export { default as userSliceReducer } from './slices/userSlice'
export { default as cartSliceReducer } from './slices/cartSlice'

//@ts-ignore
export const useAppDispatch = useDispatch<AppDispatch>
//@ts-ignore
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
