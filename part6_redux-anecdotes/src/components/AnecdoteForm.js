import { useSelector, useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { addNotification, removeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

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
    const anecdoteIds = useSelector(state => state.anecdotes.map(anecdote => anecdote.id))
    const addNew = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(addAnecdote(newAnecdote))
        // dispatch(addAnecdote({content, id: generateId(anecdoteIds), votes: 0}))
        dispatch(addNotification(`You've added "${content}"`))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000);
    }
    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={addNew}>
                <div><input name="anecdote" /></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm