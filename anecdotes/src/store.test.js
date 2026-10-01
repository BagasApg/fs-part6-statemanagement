import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
  }
}))

import anecdoteService from './services/anecdotes'

import useAnecdoteStore, { useAnecdotes, useFilter, useAnecdotesActions } from './store'

beforeEach(() => {
  useAnecdoteStore.setState({ notes: [], filter: '' })
  vi.clearAllMocks()
})

describe('useAnecdoteActions', () => {
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
})
