import { create } from 'zustand'

import anecdoteService from './services/anecdotes'

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    add: async content => {
      const newAnecdote = await anecdoteService.createNew(content)
      set(
        state => ({
          anecdotes: state.anecdotes.concat(newAnecdote)
        })
      )
    },
    vote: async id => {
      const anecdote = get().anecdotes.find(anec => anec.id === id)
      const updated = await anecdoteService.update(id, {
        ...anecdote, votes: anecdote.votes + 1
      })
      set(
        state => ({
          anecdotes: state.anecdotes.map(anec => (
            anec.id === id ? updated : anec
          ))
        })
      )
    },
    setFilter: value => set(() => ({ filter: value })),
    remove: async id => {
      // const anecdoteToDelete = get().anecdotes.find(anec => anec.id === id)
      await anecdoteService.remove(id)
      set(state => (
        {
          anecdotes: state.anecdotes.filter(anec => anec.id !== id)
        }
      ))
    },
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes }))
    }
  },
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore(state => state.anecdotes)
  const filter = useAnecdoteStore(state => state.filter)

  return anecdotes.filter(anec =>
    anec.content.toLowerCase().includes(filter.toLowerCase())
  )
}

export const useAnecdotesActions = () => useAnecdoteStore(state => state.actions)

export const useFilter = () => useAnecdoteStore(state => state.filter)

export default useAnecdoteStore
