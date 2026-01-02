/**
 * Data Loader - Load and cache pre-processed JSON data
 */

import { Movie, Metadata, SimilarMovie } from './types'
import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'public', 'data')

// Cache
let moviesCache: Movie[] | null = null
let metadataCache: Metadata | null = null
let similarityCache: Record<string, SimilarMovie[]> | null = null

/**
 * Load all movies
 */
export function loadMovies(): Movie[] {
    if (moviesCache) {
        return moviesCache
    }

    const filePath = path.join(DATA_DIR, 'movies.json')

    if (!fs.existsSync(filePath)) {
        console.warn('movies.json not found. Run backend/preprocess_data.py first.')
        return []
    }

    const data = fs.readFileSync(filePath, 'utf-8')
    moviesCache = JSON.parse(data)
    return moviesCache!
}

/**
 * Load metadata
 */
export function loadMetadata(): Metadata {
    if (metadataCache) {
        return metadataCache
    }

    const filePath = path.join(DATA_DIR, 'metadata.json')

    if (!fs.existsSync(filePath)) {
        console.warn('metadata.json not found')
        return {
            genres: [],
            languages: [],
            countries: [],
            total_movies: 0,
            generated_at: new Date().toISOString()
        }
    }

    const data = fs.readFileSync(filePath, 'utf-8')
    metadataCache = JSON.parse(data)
    return metadataCache!
}

/**
 * Load similarity index
 */
export function loadSimilarityIndex(): Record<string, SimilarMovie[]> {
    if (similarityCache) {
        return similarityCache
    }

    const filePath = path.join(DATA_DIR, 'similarity_index.json')

    if (!fs.existsSync(filePath)) {
        console.warn('similarity_index.json not found')
        return {}
    }

    const data = fs.readFileSync(filePath, 'utf-8')
    similarityCache = JSON.parse(data)
    return similarityCache!
}

/**
 * Get movie by ID
 */
export function getMovieById(id: number): Movie | null {
    const movies = loadMovies()
    return movies.find(m => m.id === id) || null
}

/**
 * Get multiple movies by IDs
 */
export function getMoviesByIds(ids: number[]): Movie[] {
    const movies = loadMovies()
    const movieMap = new Map(movies.map(m => [m.id, m]))
    return ids.map(id => movieMap.get(id)).filter(Boolean) as Movie[]
}

/**
 * Search movies by title
 */
export function searchMoviesByTitle(query: string, limit = 20): Movie[] {
    const movies = loadMovies()
    const lowerQuery = query.toLowerCase()

    return movies
        .filter(m =>
            m.title.toLowerCase().includes(lowerQuery) ||
            m.original_title.toLowerCase().includes(lowerQuery)
        )
        .slice(0, limit)
}
