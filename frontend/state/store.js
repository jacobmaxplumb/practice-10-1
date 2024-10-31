import { configureStore } from '@reduxjs/toolkit'
import { formSlice } from './formSlice'
import { pizzaApi } from './pizzaApi'

export const resetStore = () => configureStore({
  reducer: {
    [formSlice.name]: formSlice.reducer,
    [pizzaApi.reducerPath]: pizzaApi.reducer
  },
  middleware: getDefault => getDefault().concat(pizzaApi.middleware),
})

export const store = resetStore()
