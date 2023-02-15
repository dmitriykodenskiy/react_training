import { useSelector, useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const generateId = (idsArray) => {
    const id = (10000 * Math.random() + 1).toFixed(0)
    if (!idsArray.includes(id)) {
        return id
    } else {
        generateId(idsArray)
    }
}

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const anecdoteIds = useSelector(state => state.map(anecdote => anecdote.id))
    const addNew = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(addAnecdote(generateId(anecdoteIds), content))
    }
    return(
        <form onSubmit={addNew}>
            <div><input name="anecdote" /></div>
            <button type='submit'>create</button>
        </form>
    )
}

export default AnecdoteForm