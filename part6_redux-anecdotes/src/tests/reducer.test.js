import deepFreeze from 'deep-freeze'
import counterReducer from '../reducers/anecdoteReducer'
import initialState from '../data/initialState'

describe('anecdotes reducer', () => {
  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('review is incremented', () => {
    const action = {
      type: 'INCREMENT',
      payload: {
        id: 1
      }
    }
    const state = [
      {
        content: 'If it hurts, do it more often',
        id: 1,
        votes: 0
      }
    ]

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual([
      {
        content: 'If it hurts, do it more often',
        id: 1,
        votes: 1
      }
    ])
  })
  
  test('add new anecdote', () => {
    const action = {
      type: 'ADD NEW',
      payload: {
        content: 'new joke',
        id: 2,
        votes: 0
      }
    }
    const state = [
      {
        content: 'If it hurts, do it more often',
        id: 1,
        votes: 0
      }
    ]

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual([
      {
        content: 'If it hurts, do it more often',
        id: 1,
        votes: 0
      },
      {
        content: 'new joke',
        id: 2,
        votes: 0
      }
    ])
  })
  
})