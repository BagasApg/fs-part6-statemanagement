import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, createAnecdote, updateAnecdote } from "../requests";
import useNotification from "./useNotification";

export const useAnecdotes = () => {

  const { setNotification } = useNotification()

  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: false
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      setNotification(`created anecdote '${newAnecdote.content}'`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    },
    onError: (error) => {
      // console.dir(error)
      setNotification(error.message)
      // setNotification('too short anecdote, must have length 5 or more')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries()
    }
  })

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote: (content) => newAnecdoteMutation.mutate({ content, votes: 0 }),
    vote: (anecdote) => updateAnecdoteMutation.mutate({
      ...anecdote, votes: anecdote.votes + 1
    })
  }
}
