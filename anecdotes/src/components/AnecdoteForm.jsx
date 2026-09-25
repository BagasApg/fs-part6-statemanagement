import { useAnecdotesActions } from "../store"

const AnecdoteForm = () => {

  const { add } = useAnecdotesActions()

  const generateId = () => Number((Math.random() * 1000000).toFixed(0))

  const addAnecdote = (e) => {
    e.preventDefault()

    const content = e.target.anecdote.value

    add(content)

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
