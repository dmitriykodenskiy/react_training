import initialState from '../data/initialState'

export const increaseLikes = (id) => {
  return {type: 'INCREMENT', payload: {id: id}}
}

export const addAnecdote = (id, content) => {
  return {
    type: 'ADD NEW',
    payload: {
        content,
        id: id,
        votes: 0
    }
}
}

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  // console.log('action', action)

  switch (action.type) {
    case 'INCREMENT':
      return state.map(item => item.id === action.payload.id ? {...item, votes: item.votes + 1} : item)
    case 'ADD NEW':
      return [...state, action.payload]
  
    default:
      break;
  }
  return state
}

export default reducer