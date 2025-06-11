import { configureStore } from '@reduxjs/toolkit'
import voterReducer from '@/features/voters/voterSlice'

export const store = configureStore({
  reducer: {
    voters: voterReducer,
  },
})
