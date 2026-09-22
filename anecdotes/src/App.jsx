import { useAnecdotes, useAnecdotesActions } from "./store"

const App = () => {

  const generateId = () => Number((Math.random() * 1000000).toFixed(0))

  const anecdotes = useAnecdotes()
  const { vote, add } = useAnecdotesActions()

  const addAnecdote = (e) => {
    e.preventDefault()

    const content = e.target.anecdote.value

    const newAnecdote = { id: generateId(), content, votes: 0 }
    add(newAnecdote)

    e.target.reset()
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input data-testid="new" type="text" name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App
