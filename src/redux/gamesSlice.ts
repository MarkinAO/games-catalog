import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { GameData } from '../model/types'; 

export interface GameState {
  games: GameData[]
  filteredGames: GameData[]
  count: number
  load: boolean
  error: string
}

const initialState: GameState = {
    games: [],
    filteredGames: [],
    count: 0,
    load: false,
    error: ''
}

const url = `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_KEY}`;
export const getGames = createAsyncThunk('card/getGames', (count: number) => {
    const newCount = count + 1;
    return axios.get(url, {params: {page_size: 100}}).then(res => {
        if(res.status === 200) {
            return res.data.results
        } else {
          if(newCount < 4) getGames(newCount);
        }
    })
})

export const GamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getGames.pending, state => {
        state.load = true
      })
      .addCase(getGames.fulfilled, (state, action) => {
        state.load = false
        state.games = action.payload
        state.error = ''
      })
      .addCase(getGames.rejected, (state, action) => {
        state.load = false
        state.error = 'Что-то пошло не так...'
      })
  }
})

export default GamesSlice.reducer