import { useState } from 'react'

const MaxVoted = ({anecdote}) => {
  if (anecdote) {
    return (
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdote}</p>
      </div>
    )
  }
  return <div></div>
}

const Vote = ({selectedVote}) => {
  if (selectedVote) {
    return <p>has {selectedVote} votes</p>
  }

  return <p>has 0 votes</p>
}

const Button = ({text, clickHandler}) => {
  return (
    <button onClick={clickHandler}>{text}</button>
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
  const [vote, setVote] = useState({})

  const voteHandler = () => {
    const currentVote = {...vote}
    if (!vote[selected]) {
      currentVote[selected] = 1
      setVote(currentVote)
    } else {
      currentVote[selected] = vote[selected] + 1
      setVote(currentVote)
    }
  }

  const getRandom = () => {
    const index = Math.floor(Math.random() * anecdotes.length)
    setSelected(index)
  }

  const getMaxVoted = () => {
    let max = 0
    for (let i = 0; i < anecdotes.length; i++) {
      if (!vote[i]) {
        vote[i] = 0
      }
    }
    
    for (let i = 0; i < anecdotes.length; i++) {
      if (vote[i]) {
        if (vote[i] > vote[max]) {
          max = i
        }
      }
    }
    return anecdotes[max]
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <Vote selectedVote={vote[selected]} />
      <Button clickHandler={voteHandler} text="vote" />
      <Button clickHandler={getRandom} text="next anecdote" />
      <MaxVoted anecdote={getMaxVoted()} />
    </div>
  )
}

export default App