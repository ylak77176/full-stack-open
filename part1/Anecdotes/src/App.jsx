import { useState } from 'react'

// COMPONENTS
const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Anecdote = ({anecdotes, selected}) => <p>{anecdotes[selected]}</p>

const Vote = ({votes, selected}) =>{

  if (votes[selected] === 0) {
    return (
      <p> No votes </p>
    )
  }
  return (
   <p>has {votes[selected]} votes</p> 
  )
}

// HELPERS
  // init votes array
  const votesInit = (length) => {
    const votesArray = {}
    for (let i = 0; i < length; i++){
      votesArray[i] = 0 
    }
    return votesArray
  }

    const mostVotes = (votes) => {
    let bestAnecdote = 0
    let score = -1
    for (let key in votes){
      if (votes[key] > score){
        bestAnecdote = key
        score = votes[key]
      }
    }
    return(
      bestAnecdote
    )
  }

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(votesInit(anecdotes.length))
  
  const mv = mostVotes(votes)

    // button interaction
  const getRandomInt = (max) => {
    const newSelected = Math.floor(Math.random() * max)
    setSelected(newSelected)
  }

  const handleVoteClick = () => {
    const newVotes = { ...votes }
    newVotes[selected] += 1
    setVotes(newVotes)
  }
    
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdotes={anecdotes} selected={selected} />
      <Vote votes={votes} selected={selected} />
      <Button onClick={handleVoteClick} text="votes" />
      <Button onClick={() => getRandomInt(anecdotes.length)} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdotes={anecdotes} selected={mv} />
      <Vote votes={votes} selected={mv} />
    </div>
  )
}

export default App