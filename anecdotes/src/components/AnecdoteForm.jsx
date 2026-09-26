import { useNotificationsActions } from "../notificationStore"
import { useAnecdotesActions } from "../store"

const AnecdoteForm = () => {

  const { add } = useAnecdotesActions()

  const { setNotification } = useNotificationsActions()

  const addAnecdote = (e) => {
    e.preventDefault()

    const content = e.target.anecdote.value

    add(content)

    setNotification(`Anecdote "${content}" created successfully!`)
    setTimeout(() => {
      setNotification('')
    }, 5000)

    e.target.reset()
  }
  return (
    <>

      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input data-testid="new" type="text" name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
