// import initialState from '../data/initialState'
import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    increaseLikes(state, action) {
      if (state.length === 0) return state
      return state.map(item => item.id === action.payload ? {...item, votes: item.votes + 1} : item)
    },
    addAnecdote(state, action) {
      if (state.length === 0) return state
      return [...state, action.payload]
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { increaseLikes, addAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer