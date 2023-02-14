import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = [
    {
        name: 'good',
        value: 0
    },
    {
        name: 'neutral',
        value: 0
    },
    {
        name: 'bad',
        value: 0
    },
]

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual([
      {
          name: 'good',
          value: 1
      },
      {
          name: 'neutral',
          value: 0
      },
      {
          name: 'bad',
          value: 0
      },
    ])
  })
  
  test('neutral is incremented', () => {
    const action = {
      type: 'NEUTRAL'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual([
      {
          name: 'good',
          value: 0
      },
      {
          name: 'neutral',
          value: 1
      },
      {
          name: 'bad',
          value: 0
      },
    ])
  })
  
  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual([
      {
          name: 'good',
          value: 0
      },
      {
          name: 'neutral',
          value: 0
      },
      {
          name: 'bad',
          value: 1
      },
    ])
  })
  
  test('stats reset', () => {
    const action = {
      type: 'ZERO'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual([
      {
          name: 'good',
          value: 0
      },
      {
          name: 'neutral',
          value: 0
      },
      {
          name: 'bad',
          value: 0
      },
    ])
  })
})