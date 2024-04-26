import { configureStore } from '@reduxjs/toolkit';
import gamesSlice from './gamesSlice';

export const store = configureStore({
  reducer: {
    games: gamesSlice
  }  
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch