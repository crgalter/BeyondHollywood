/**
 * Recommendation Engine - Implements all recommendation modes
 */

import { Movie, FilterParams, SearchParams } from './types'
import { loadMovies, loadSimilarityIndex, getMoviesByIds } from './data-loader'

const INAPPROPRIATE_KWORDS = ['porn', 'erotic', 'sex', 'sexual', 'hentai', 'xxx', 'hardcore', 'adult']

function isAppropriate(movie: Movie): boolean {
    const title = (movie.title + ' ' + movie.original_title).toLowerCase()
    const overview = (movie.overview || '').toLowerCase()
    const genres = (movie.genres || []).map(g => g.toLowerCase())
    const keywords = (movie.keywords || []).map(k => k.toLowerCase())

    const hasInappropriate = INAPPROPRIATE_KWORDS.some(word =>
        title.includes(word) ||
        overview.includes(word) ||
        genres.includes(word) ||
        keywords.includes(word)
    )

    return !hasInappropriate
}

/**
 * Apply filters to movies
 */
export function applyFilters(movies: Movie[], filters: FilterParams): Movie[] {
    let filtered = movies.filter(isAppropriate)

    // Genre filter
    if (filters.genres && filters.genres.length > 0) {
        filtered = filtered.filter(m =>
            filters.genres!.some(genre => m.genres.includes(genre))
        )
    }

    // Rating filter
    if (filters.minRating !== undefined) {
        filtered = filtered.filter(m => m.vote_average >= filters.minRating!)
    }

    // Year filter
    if (filters.yearFrom !== undefined) {
        filtered = filtered.filter(m => m.year && m.year >= filters.yearFrom!)
    }
    if (filters.yearTo !== undefined) {
        filtered = filtered.filter(m => m.year && m.year <= filters.yearTo!)
    }

    // Runtime filter
    if (filters.runtime && filters.runtime.length > 0) {
        filtered = filtered.filter(m => {
            if (filters.runtime!.includes('short') && m.runtime > 0 && m.runtime < 40) return true
            if (filters.runtime!.includes('medium') && m.runtime >= 40 && m.runtime <= 120) return true
            if (filters.runtime!.includes('long') && m.runtime > 120) return true
            return false
        })
    }

    // Language filter
    if (filters.languages && filters.languages.length > 0) {
        filtered = filtered.filter(m =>
            filters.languages!.includes(m.original_language)
        )
    }

    // Country filter
    if (filters.countries && filters.countries.length > 0) {
        filtered = filtered.filter(m =>
            m.production_countries[0] && filters.countries!.some(country => m.production_countries[0].includes(country))
        )
    }

    // Budget filter
    if (filters.budget && filters.budget.length > 0) {
        filtered = filtered.filter(m => {
            if (m.budget === 0) return false
            if (filters.budget!.includes('ultralow') && m.budget < 1000000) return true
            if (filters.budget!.includes('low') && m.budget >= 1000000 && m.budget < 5000000) return true
            if (filters.budget!.includes('medium') && m.budget >= 5000000 && m.budget < 50000000) return true
            if (filters.budget!.includes('high') && m.budget >= 50000000 && m.budget < 200000000) return true
            if (filters.budget!.includes('blockbuster') && m.budget >= 200000000) return true
            return false
        })
    }

    // Popularity filter
    if (filters.popularity && filters.popularity.length > 0) {
        filtered = filtered.filter(m => {
            if (filters.popularity!.includes('unknown') && m.popularity < 1) return true
            if (filters.popularity!.includes('niche') && m.popularity >= 1 && m.popularity < 10) return true
            if (filters.popularity!.includes('known') && m.popularity >= 10 && m.popularity < 50) return true
            if (filters.popularity!.includes('popular') && m.popularity >= 50 && m.popularity < 100) return true
            if (filters.popularity!.includes('very') && m.popularity >= 100) return true
            return false
        })
    }

    // Beyond Hollywood filter
    if (filters.beyondHollywood) {
        filtered = filtered.filter(m => {
            const isUS = m.production_countries.some(c =>
                c.includes('United States') || c.includes('USA')
            )
            // Allow if non-US OR if US but low budget (under 10M)
            return !isUS || (m.budget > 0 && m.budget < 10000000)
        })
    }

    return filtered
}

/**
 * Search movies with filters and sorting
 */
export function searchMovies(params: SearchParams): { movies: Movie[], total: number } {
    let movies = loadMovies()

    // Text search
    if (params.q && params.q.trim()) {
        const query = params.q.toLowerCase()
        movies = movies.filter(m =>
            m.title.toLowerCase().includes(query) ||
            m.original_title.toLowerCase().includes(query) ||
            m.overview.toLowerCase().includes(query) ||
            m.genres.some(g => g.toLowerCase().includes(query)) ||
            m.keywords.some(k => k.toLowerCase().includes(query))
        )
    }

    // Apply filters
    movies = applyFilters(movies, params)

    // Sort
    const sort = params.sort || 'relevant'
    switch (sort) {
        case 'rating':
            movies.sort((a, b) => b.vote_average - a.vote_average)
            break
        case 'popular':
            movies.sort((a, b) => b.popularity - a.popularity)
            break
        case 'recent':
            movies.sort((a, b) => (b.year || 0) - (a.year || 0))
            break
        case 'leastKnown':
            movies.sort((a, b) => a.popularity - b.popularity)
            break
        case 'alphabetical':
            movies.sort((a, b) => a.title.localeCompare(b.title))
            break
        default:
            // 'relevant' - keep current order or sort by vote_count
            movies.sort((a, b) => b.vote_count - a.vote_count)
    }

    const total = movies.length
    const page = params.page || 1
    const limit = params.limit || 20
    const start = (page - 1) * limit
    const end = start + limit

    return {
        movies: movies.slice(start, end),
        total
    }
}

/**
 * Get similar movies to a given movie
 */
export function getSimilarMovies(movieId: number, limit = 20): Movie[] {
    const similarityIndex = loadSimilarityIndex()
    const similarMovies = similarityIndex[movieId.toString()]

    if (!similarMovies || similarMovies.length === 0) {
        return []
    }

    const movieIds = similarMovies.slice(0, limit).map(s => s.id)
    return getMoviesByIds(movieIds)
}

/**
 * Get similar movies with optional filters
 */
export function getSimilarMoviesWithFilters(movieId: number, params: SearchParams): { movies: Movie[], total: number } {
    const similarityIndex = loadSimilarityIndex()
    const similarMovies = similarityIndex[movieId.toString()]

    if (!similarMovies || similarMovies.length === 0) {
        return { movies: [], total: 0 }
    }

    // Get all similar movies first (not just a slice)
    const movieIds = similarMovies.map(s => s.id)
    let movies = getMoviesByIds(movieIds)

    // Apply filters
    movies = applyFilters(movies, params)

    const total = movies.length
    const page = params.page || 1
    const limit = params.limit || 20
    const start = (page - 1) * limit
    const end = start + limit

    return {
        movies: movies.slice(start, end),
        total
    }
}

/**
 * Get hidden gems
 */
export function getHiddenGems(filters: FilterParams = {}, limit = 20, page = 1): Movie[] {
    const movies = loadMovies()
    const start = (page - 1) * limit
    const end = start + limit

    let pool = movies.filter(isAppropriate).filter(m =>
        m.vote_average >= 7.0 &&
        m.vote_count < 500 &&
        m.popularity < 10.0
    )

    // Apply additional user filters
    pool = applyFilters(pool, filters)

    // Calculate hidden gem score
    const scored = pool.map(m => ({
        movie: m,
        score: m.vote_average * (1 + Math.log(m.vote_count + 1)) / Math.max(m.popularity, 0.1)
    }))

    scored.sort((a, b) => b.score - a.score)

    return scored.slice(start, end).map(s => s.movie)
}

/**
 * Get international picks
 */
export function getInternationalPicks(filters: FilterParams = {}, limit = 20, page = 1): Movie[] {
    const movies = loadMovies()
    const start = (page - 1) * limit
    const end = start + limit

    let pool = movies.filter(isAppropriate).filter(m => {
        const isInternational =
            !m.production_countries.some(c => c.includes('United States')) ||
            m.original_language !== 'en'

        return isInternational &&
            m.vote_average >= 6.5 &&
            m.vote_count >= 20
    })

    // Apply additional user filters
    pool = applyFilters(pool, filters)

    // Calculate international score
    const commonLanguages = new Set(['en', 'es', 'fr', 'de', 'it'])
    const scored = pool.map(m => ({
        movie: m,
        score: m.vote_average * Math.log(m.vote_count + 1) *
            (commonLanguages.has(m.original_language) ? 1.0 : 1.2)
    }))

    scored.sort((a, b) => b.score - a.score)

    return scored.slice(start, end).map(s => s.movie)
}

/**
 * Get low-budget treasures
 */
export function getLowBudgetTreasures(filters: FilterParams = {}, limit = 20, page = 1): Movie[] {
    const movies = loadMovies()
    const start = (page - 1) * limit
    const end = start + limit

    const pool = movies.filter(isAppropriate).filter(m =>
        m.budget > 0 &&
        m.budget < 5000000 &&
        m.vote_average >= 6.5 &&
        m.vote_count >= 10
    )

    // Apply additional user filters
    let filtered = applyFilters(pool, filters)

    // Calculate value score
    const scored = filtered.map(m => ({
        movie: m,
        score: (m.vote_average ** 2) * Math.log(m.vote_count + 1) / Math.max(m.budget / 100000, 0.1)
    }))

    scored.sort((a, b) => b.score - a.score)

    return scored.slice(start, end).map(s => s.movie)
}

/**
 * Get movies by genre
 */
export function getMoviesByGenre(genre: string, limit = 20): Movie[] {
    const movies = loadMovies()

    const filtered = movies.filter(m => m.genres.includes(genre))
    filtered.sort((a, b) => b.vote_average - a.vote_average)

    return filtered.slice(0, limit)
}

/**
 * Get featured movies for landing page
 */
export function getFeaturedMovies(limit = 10): Movie[] {
    const movies = loadMovies()

    // Get high-quality, popular movies
    const featured = movies.filter(m =>
        m.vote_average >= 7.0 &&
        m.vote_count >= 1000 &&
        m.popularity >= 10
    )

    featured.sort((a, b) => b.popularity - a.popularity)

    return featured.slice(0, limit)
}

/**
 * Get a random movie for the "Surprise Me" feature
 */
export function getRandomSurpriseMovie(filters: FilterParams = {}): Movie | null {
    const movies = loadMovies()

    // Core discovery pool: High rating, lower popularity, appropriate content
    let pool = movies.filter(isAppropriate).filter(m =>
        m.vote_average >= 6.5 &&
        m.vote_count >= 10 &&
        m.popularity < 15.0
    )

    // Apply specific discovery filters
    if (filters.beyondHollywood) {
        pool = pool.filter(m => !m.production_countries.some(c => c.includes('United States') || c.includes('USA')))
    }

    if (filters.hiddenGem) {
        pool = pool.filter(m => m.vote_average >= 7.5 && m.vote_count < 200)
    }

    if (filters.independent) {
        pool = pool.filter(m => m.budget > 0 && m.budget < 2000000)
    }

    // Additional filters (genre, etc)
    pool = applyFilters(pool, filters)

    if (pool.length === 0) return null

    // Pick a random one
    const randomIndex = Math.floor(Math.random() * pool.length)
    return pool[randomIndex]
}
