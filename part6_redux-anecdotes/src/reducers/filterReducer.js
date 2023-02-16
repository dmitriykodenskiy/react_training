const filterReducer = (state = '', action) => {
    switch (action.type) {
      case 'SET_FILTER':
        return action.payload
      default:
        return state
    }
}

export const filterBySearch = (searchPhrase) => {
    return {
        type: 'SET_FILTER',
        payload: searchPhrase
    }
}

export default filterReducer