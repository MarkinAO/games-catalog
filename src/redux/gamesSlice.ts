import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { GameData } from '../model/types'; 

export interface GameState {
  games: GameData[]
  count: number
  load: boolean
  error: string
}

const initialState: GameState = {
    games: [],
    count: 0,
    load: false,
    error: ''
}

const url = `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_KEY}`;
export const getGames = createAsyncThunk('card/getGames', () => {    
    return axios.get(url).then(res => {
        if(res.status === 200) {
            return res.data.results
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