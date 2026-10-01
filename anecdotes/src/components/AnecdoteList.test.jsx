
import { it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import useAnecdoteStore from '../store'
import AnecdoteList from './AnecdoteList'

it('component displaying anecdotes from store sorts by votes', async () => {
  const mockAnecdotes = [
    { id: 3, content: 'ends with this', votes: 1 },
    { id: 1, content: 'This goes first', votes: 10 },
    { id: 2, content: 'then this', votes: 6 },
  ]

  useAnecdoteStore.setState({ anecdotes: mockAnecdotes, filter: '' })

  render(<AnecdoteList />)

  screen.debug()

  const anecdotes = screen.getAllByText('has', { exact: false })

  expect(anecdotes[0].textContent).toContain('10')
  expect(anecdotes[1].textContent).toContain('6')
  expect(anecdotes[2].textContent).toContain('1')

})
