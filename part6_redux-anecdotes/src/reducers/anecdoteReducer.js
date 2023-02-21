// import initialState from '../data/initialState'
import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

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

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async (dispatch, getState) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const addLike = id => {
  return async (dispatch, getState) => {
    await dispatch(increaseLikes(id))
    const likedAnecdote = getState().anecdotes.find(anecdote => anecdote.id === id)
    anecdoteService.updateLikes(id, likedAnecdote)
  }
}

export const { increaseLikes, addAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer