import { useEffect } from "react"
import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import Filter from "./components/Filter"
import Notification from "./components/Notification"

import { useAnecdotesActions } from "./store"
import { useNotifications } from "./notificationStore"

const App = () => {

  const notification = useNotifications()

  const { initialize } = useAnecdotesActions()

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <div>
      <Filter />
      <h2>Anecdotes</h2>
      <Notification notification={notification} />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
