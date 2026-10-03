
import { it, expect, beforeEach, vi } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'

import useAnecdoteStore from '../store'
import AnecdoteList from './AnecdoteList'

beforeEach(() => {
  cleanup()
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })


})

it('component displaying anecdotes from store sorts by votes', async () => {
  const mockAnecdotes = [
    { id: 3, content: 'ends with this', votes: 1 },
    { id: 1, content: 'This goes first', votes: 10 },
    { id: 2, content: 'then this', votes: 6 },
  ]

  useAnecdoteStore.setState({ anecdotes: mockAnecdotes, filter: '' })

  render(<AnecdoteList />)

  // screen.debug()

  const anecdotes = screen.getAllByText('has', { exact: false })

  expect(anecdotes[0].textContent).toContain('10')
  expect(anecdotes[1].textContent).toContain('6')
  expect(anecdotes[2].textContent).toContain('1')


  expect(anecdotes[0].textContent).not.toEqual('1')
  expect(anecdotes[1].textContent).not.toEqual('10')
  expect(anecdotes[2].textContent).not.toEqual('6')

})

it('component displaying anecdotes from store receives filtered list of anecdotes', async () => {

  const mockAnecdotes = [
    { id: 3, content: 'the more you know', votes: 1 },
    { id: 1, content: 'the less you get', votes: 10 },
    { id: 2, content: 'Many say that', votes: 6 },
  ]

  useAnecdoteStore.setState({ anecdotes: mockAnecdotes, filter: 'the' })

  render(<AnecdoteList />)

  screen.debug()

  expect(screen.getByText(mockAnecdotes[0].content)).toBeDefined()
  expect(screen.getByText(mockAnecdotes[1].content)).toBeDefined()
  expect(screen.queryByText(mockAnecdotes[2].content)).toBeNull()

})
