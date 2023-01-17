import { useState } from 'react'

const Anecdote = ({anecdote}) => {
  return(
    <div className='anecdote'>
      {anecdote}
    </div>
  )
}

const NextAnecdote = ({text, randomize}) => {
  return(
    <button onClick={randomize}>{text}</button>
  )
}

const Vote = ({text, vote}) => {
  return(
    <button onClick={vote}>{text}</button>
  )
}

const DisplayVotes = ({selected, selectedVotes}) => {
  return(
    <div className='votes'>
      has {selectedVotes[selected]} votes
    </div>
  )
}

const DailyAnecdote = ({selected, selectedVotes, title, anecdote, randomize, vote}) => {
  return(
    <div className='dailyAnecdot_container'>
      <h2>{title}</h2>
      <Anecdote anecdote={anecdote} />
      <DisplayVotes selected={selected} selectedVotes={selectedVotes} />
      <div className='buttons'>
        <Vote text={'Vote'} vote={vote} />
        <NextAnecdote randomize={randomize} text={'next anecdote'}/>
      </div>
    </div>
  )
}

const MostVoted = ({anecdotes, selectedVotes, title}) => {
  const maxVotes = Math.max(...selectedVotes)
  const maxVotedIndex = selectedVotes.indexOf(maxVotes)
  const mostVotedAnecdote = anecdotes[maxVotedIndex]
  return(
    <div className='mostVoted_container'>
      <h2>{title}</h2>
      <div className='most_voted_anecdote'>{mostVotedAnecdote}</div>
      <div className='max_votes'>has {Math.max(...selectedVotes)} votes</div>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const anecdoteTitle = 'Anecdote of a day'
  const mostVotedTitle = 'Anecdote with most votes'
  const [selected, setSelected] = useState(0)
  const [selectedVotes, setSelectedVotes] = useState(new Uint8Array(anecdotes.length))

  const vote = () => {
    const newVotes = [...selectedVotes]
    newVotes[selected] = newVotes[selected] + 1;
    setSelectedVotes(newVotes)
  }
  const randimizeAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  return (
    <div>
      <DailyAnecdote selected={selected} selectedVotes={selectedVotes} title={anecdoteTitle} anecdote={anecdotes[selected]} randomize={randimizeAnecdote} vote={vote} />
      <MostVoted selected={selected} selectedVotes={selectedVotes} title={mostVotedTitle} anecdotes={anecdotes} />
    </div>
  )
}

export default App