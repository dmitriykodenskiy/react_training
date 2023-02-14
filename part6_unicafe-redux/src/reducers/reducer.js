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

const counterReducer = (state = initialState, action) => {
    console.log(action)
    if (!state) {
        return state
    }
    
    switch (action.type) {
        case 'GOOD':
        return state.map(item => item.name === 'good' ? {...item, value: item.value + 1} : item)
        case 'NEUTRAL':
        return state.map(item => item.name === 'neutral' ? {...item, value: item.value + 1} : item)
        case 'BAD':
        return state.map(item => item.name === 'bad' ? {...item, value: item.value + 1} : item)
        case 'ZERO':
        return initialState
        default: return state
    }

}

export default counterReducer