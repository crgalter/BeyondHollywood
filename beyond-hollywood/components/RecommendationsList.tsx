'use client'

import { useState } from 'react'
import MovieCard from './MovieCard'
import FilterModal from './FilterModal'
import { Movie, Metadata } from '@/lib/types'

interface RecommendationsListProps {
    initialMovies: Movie[]
    mode: string
    metadata: Metadata
    initialCountry?: string
    initialGenre?: string
    initialLanguage?: string
}

export default function RecommendationsList({
    initialMovies,
    mode,
    metadata,
    initialCountry,
    initialGenre,
    initialLanguage
}: RecommendationsListProps) {
    const [movies, setMovies] = useState<Movie[]>(initialMovies)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(initialMovies.length === 60)
    const [showFilters, setShowFilters] = useState(false)
    const [filters, setFilters] = useState({
        genres: initialGenre ? [initialGenre] : [] as string[],
        countries: initialCountry ? [initialCountry] : [] as string[],
        languages: initialLanguage ? [initialLanguage] : [] as string[],
        minRating: 0,
        beyondHollywood: false
    })

    const fetchMovies = async (pageNum: number, currentFilters: any, append: boolean) => {
        setLoading(true)
        try {
            const params = new URLSearchParams({
                mode: mode === 'joies-ocultes' ? 'hidden-gems' :
                    mode === 'internacional' ? 'international' :
                        mode === 'baix-pressupost' ? 'low-budget' : mode,
                page: pageNum.toString(),
                limit: '60',
                beyondHollywood: currentFilters.beyondHollywood.toString()
            })

            if (currentFilters.genres.length > 0) params.append('genres', currentFilters.genres.join(','))
            if (currentFilters.countries.length > 0) params.append('countries', currentFilters.countries.join(','))
            if (currentFilters.languages.length > 0) params.append('languages', currentFilters.languages.join(','))
            if (currentFilters.minRating > 0) params.append('minRating', currentFilters.minRating.toString())

            const response = await fetch(`/api/discover?${params.toString()}`)
            const result = await response.json()

            if (result.success && result.data.length > 0) {
                if (append) {
                    setMovies(prev => [...prev, ...result.data])
                } else {
                    setMovies(result.data)
                }
                setHasMore(result.data.length === 60)
            } else {
                if (!append) setMovies([])
                setHasMore(false)
            }
        } catch (error) {
            console.error('Error fetching movies:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleApplyFilters = (newFilters: any) => {
        setFilters(newFilters)
        setPage(1)
        fetchMovies(1, newFilters, false)
    }

    const loadMore = () => {
        const nextPage = page + 1
        setPage(nextPage)
        fetchMovies(nextPage, filters, true)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Filter Bar */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                <button
                    onClick={() => setShowFilters(true)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.6rem 1.25rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '0.5rem',
                        color: '#f1f1f1',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                    </svg>
                    Filtres
                </button>
            </div>

            {/* Movies Grid */}
            {movies.length > 0 ? (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                    gap: '1.5rem',
                    opacity: loading && page === 1 ? 0.5 : 1,
                    transition: 'opacity 0.2s'
                }}>
                    {movies.map((movie) => (
                        <MovieCard key={`${movie.id}-${page}`} movie={movie} />
                    ))}
                </div>
            ) : !loading && (
                <div style={{ textAlign: 'center', padding: '5rem 0' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                    <h2 style={{ fontSize: '1.25rem', color: '#f1f1f1' }}>No hi ha resultats</h2>
                    <p style={{ color: '#b0b0b0' }}>Prova de canviar els filtres.</p>
                </div>
            )}

            {/* Load More Button */}
            {hasMore && (
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <button
                        onClick={loadMore}
                        disabled={loading}
                        style={{
                            background: 'transparent',
                            color: '#e94560',
                            border: '2px solid #e94560',
                            padding: '0.75rem 2.5rem',
                            borderRadius: '9999px',
                            fontSize: '1rem',
                            fontWeight: 600,
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? 'Carregant...' : 'Càrrega més'}
                    </button>
                </div>
            )}

            <FilterModal
                isOpen={showFilters}
                onClose={() => setShowFilters(false)}
                onApply={handleApplyFilters}
                initialFilters={filters}
                availableGenres={metadata.genres}
                availableCountries={metadata.countries}
            />
        </div>
    )
}
