
import { useAnecdotesActions } from "../store"

const Anecdote = ({ anecdote }) => {

  const { vote } = useAnecdotesActions()
  return (

    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  )
}

export default Anecdote
