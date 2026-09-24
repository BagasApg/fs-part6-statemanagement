import { create } from 'zustand'

import anecdoteService from './services/anecdotes'

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  actions: {
    add: anecdote => set(
      state => ({
        anecdotes: state.anecdotes.concat(anecdote)
      })
    ),
    vote: id => set(
      state => ({
        anecdotes: state.anecdotes.map(anecdote => (
          anecdote.id === id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote
        ))
      })
    ),
    setFilter: value => set(() => ({ filter: value })),
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

