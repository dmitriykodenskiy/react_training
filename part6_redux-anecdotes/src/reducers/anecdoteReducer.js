import initialState from '../data/initialState'

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'INCREMENT':
      return state.map(item => item.id === action.payload.id ? {...item, votes: item.votes + 1} : item)
    // case 'ADD NEW':

    //   break;
  
    default:
      break;
  }
  return state
}

export default reducer