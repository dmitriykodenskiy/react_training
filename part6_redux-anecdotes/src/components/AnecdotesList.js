import { useSelector, useDispatch } from 'react-redux'
import { addLike } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdotesList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const searchingPhrase = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const vote = (id) => {
        const votedAnecdote = anecdotes.find(item => item.id === id)
        dispatch(addLike(id))
        dispatch(setNotification(`You voted "${votedAnecdote.content}"`, 5))
    }
    const anecdotesFiltered = anecdotes.filter(item => item.content.toLowerCase().includes(searchingPhrase))
    const anecdotesSorted = anecdotesFiltered.sort((a, b) =>  a.votes === b.votes ? 0 : a.votes < b.votes ? 1 : -1)
    return(
        <div>
            {anecdotesSorted.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        <span>has {anecdote.votes}</span>
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
        
    )
}
export default AnecdotesList