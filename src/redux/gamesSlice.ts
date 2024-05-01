import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { GameData, Filters } from '../model/types';
import type { PayloadAction } from '@reduxjs/toolkit'

export interface GameState {
  games: GameData[]
  filters: Filters
  count: number
  load: boolean
  error: string
  query: string
  warning: string
}

const initialState: GameState = {
    games: [],
    filters: {
      platforms: '',
      tags: '',
      ordering: '',
      genres: ''
    },
    count: 0,
    load: false,
    error: '',
    query: '',
    warning: ''
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

interface ISearchQuery {
  query: string
  count: number
  platforms: string
  tags: string
  ordering: string
  genres: string
}

export const searchQuery = createAsyncThunk('card/searchQuery', ({query, count, platforms, tags, ordering, genres}: ISearchQuery) => {
  const params = {
    params: {
      page_size: 100,
      search_precise: true,
      search_exact: true,
    }    
  }
  let newUrl = url;
  if(query.length > 0) newUrl = newUrl + `&search=${query}`;
  if(tags.length > 0) newUrl = newUrl + `&tags=${tags}`;
  if(platforms.length > 0) newUrl = newUrl + `&parent_platforms=${platforms}`;
  if(ordering.length > 0) newUrl = newUrl + `&ordering=-${ordering}`;
  if(genres.length > 0) newUrl = newUrl + `&genres=${genres}`;
  
  const newCount = count + 1;
  return axios.get(newUrl, params).then(res => {
      if(res.status === 200) {
          return res.data.results
      } else {
        if(newCount < 4) searchQuery({query, count: newCount, platforms, tags, ordering, genres});
      }
  })
})

export const GamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Filters>) {
      state.filters = action.payload;
    },
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      // Получить список игр
      .addCase(getGames.pending, state => {
        state.load = true
      })
      .addCase(getGames.fulfilled, (state, action) => {
        state.load = false
        state.games = action.payload
        state.error = ''
      })
      .addCase(getGames.rejected, (state) => {
        state.load = false
        state.error = 'Что-то пошло не так...'
      })

      // Поиск
      .addCase(searchQuery.pending, state => {
        state.load = true
        state.warning = ''
      })
      .addCase(searchQuery.fulfilled, (state, action) => {
        state.load = false
        state.games = action.payload
        state.error = ''
        if(action.payload.length === 0) state.warning = 'По вашему запросу ничего не найдено'
      })
      .addCase(searchQuery.rejected, (state) => {
        state.load = false
        state.error = 'Что-то пошло не так...'
      })
  }
})

export const { setFilters, setQuery } = GamesSlice.actions
export default GamesSlice.reducer