
import { useAnecdotesActions } from "../store"
import { useNotificationsActions } from "../notificationStore"

const Anecdote = ({ anecdote }) => {

  const { setNotification } = useNotificationsActions()
  const { vote, remove } = useAnecdotesActions()

  const handleVote = (id) => {
    vote(id)

    setNotification(`You voted '${anecdote.content}'!`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const handleDelete = (id) => {
    remove(id)

    setNotification(`You delete '${anecdote.content}'!`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  return (

    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote.id)}>vote</button>
        {anecdote.votes === 0
          ?
          <button onClick={() => handleDelete(anecdote.id)}>delete</button>
          :
          ''
        }
      </div>
    </div>
  )
}

export default Anecdote
