import initialState from '../data/initialState'
import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: initialState,
  reducers: {
    increaseLikes(state, action) {
      return state.map(item => item.id === action.payload ? {...item, votes: item.votes + 1} : item)
    },
    addAnecdote(state, action) {
      return [...state, action.payload]
    }
  }
})

export const { increaseLikes, addAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer