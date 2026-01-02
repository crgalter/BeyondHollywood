/**
 * Movie type definitions
 */

export interface Movie {
    id: number
    title: string
    original_title: string
    overview: string
    tagline: string
    vote_average: number
    vote_count: number
    popularity: number
    release_date: string
    year: number | null
    runtime: number
    budget: number
    revenue: number
    original_language: string
    genres: string[]
    keywords: string[]
    production_countries: string[]
    spoken_languages: string[]
    poster_path: string
    backdrop_path: string
    imdb_id: string
    homepage: string
}

export interface MovieCardData {
    id: number
    title: string
    poster_path: string
    vote_average: number
    vote_count: number
    year: number | null
    runtime: number
    genres: string[]
}

export interface SimilarMovie {
    id: number
    score: number
}

export interface Metadata {
    genres: string[]
    languages: string[]
    countries: string[]
    total_movies: number
    generated_at: string
}

export interface FilterParams {
    genres?: string[]
    minRating?: number
    yearFrom?: number
    yearTo?: number
    runtime?: string[]
    languages?: string[]
    countries?: string[]
    budget?: string[]
    popularity?: string[]
    beyondHollywood?: boolean
    hiddenGem?: boolean
    independent?: boolean
}

export interface SearchParams extends FilterParams {
    q?: string
    page?: number
    limit?: number
    sort?: string
}

export interface WatchProvider {
    logo_path: string
    provider_id: number
    provider_name: string
    display_priority: number
}

export interface WatchProvidersResponse {
    id: number
    results: {
        [countryCode: string]: {
            link: string
            flatrate?: WatchProvider[]
            rent?: WatchProvider[]
            buy?: WatchProvider[]
        }
    }
}
