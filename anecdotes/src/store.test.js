import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act, render, screen } from '@testing-library/react'

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    update: vi.fn(),
    createNew: vi.fn(),
  }
}))

import anecdoteService from './services/anecdotes'

import useAnecdoteStore, { useAnecdotes, useFilter, useAnecdotesActions } from './store'

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
})

it('initialize loads notes from service', async () => {
  const mockAnecdotes = [{ id: 1, content: 'Test', votes: 12 }]
  anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

  const { result } = renderHook(() => useAnecdotesActions())

  await act(async () => {
    await result.current.initialize()
  })

  const { result: anecdotesResult } = renderHook(() => useAnecdotes())
  expect(anecdotesResult.current).toEqual(mockAnecdotes)
})

it('voting increases the number of votes for an anecdote', async () => {
  const anecdote = { id: 1, content: 'This one is good', votes: 12 }
  useAnecdoteStore.setState({ anecdotes: [anecdote] })
  anecdoteService.update.mockResolvedValue({ ...anecdote, votes: 13 })

  const { result } = renderHook(() => useAnecdotesActions())

  await act(async () => {
    await result.current.vote(1)
  })

  const { result: anecdotesResult } = renderHook(() => useAnecdotes())
  expect(anecdotesResult.current[0].votes).toBe(13)


})
