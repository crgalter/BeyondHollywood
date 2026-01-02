import { loadMovies } from './data-loader'
import { Movie } from './types'

export interface AutocompleteResult {
    id: number
    title: string
    year: number | null
    poster_path: string
}

export function autocompleteMovies(query: string, limit = 5): AutocompleteResult[] {
    if (!query || query.length < 2) return []

    const movies = loadMovies()
    const lowerQuery = query.toLowerCase()

    const results = movies
        .filter(m =>
            m.title.toLowerCase().includes(lowerQuery) ||
            m.original_title.toLowerCase().includes(lowerQuery)
        )
        // Prioritize results that start with the query
        .sort((a, b) => {
            const aTitle = a.title.toLowerCase()
            const bTitle = b.title.toLowerCase()
            const aStarts = aTitle.startsWith(lowerQuery)
            const bStarts = bTitle.startsWith(lowerQuery)

            if (aStarts && !bStarts) return -1
            if (!aStarts && bStarts) return 1

            // Then by popularity
            return b.popularity - a.popularity
        })
        .slice(0, limit)
        .map(m => ({
            id: m.id,
            title: m.title,
            year: m.year,
            poster_path: m.poster_path
        }))

    return results
}
