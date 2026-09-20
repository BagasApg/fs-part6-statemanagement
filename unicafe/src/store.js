import { create } from "zustand";

const useRatingStore = create(set => ({
  acted: false,
  ratings: {
    good: 0,
    neutral: 0,
    bad: 0
  },
  increment: (rating) => set(state => {
    let good = state.ratings.good,
      neutral = state.ratings.neutral,
      bad = state.ratings.bad

    if (rating === 'good') {
      good++
    } else if (rating === 'neutral') {
      neutral++
    } else if (rating === 'bad') {
      bad++
    }
    return {
      ratings: {
        good, neutral, bad
      }
    }

  })
}))

export const useRatings = () => useRatingStore(state => state.ratings)

export const useRatingsIncrement = () => useRatingStore(state => state.increment)


