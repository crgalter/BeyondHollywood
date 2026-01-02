'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import MovieCard from '@/components/MovieCard'
import FilterModal from '@/components/FilterModal'
import { Metadata, Movie } from '@/lib/types'
import { countryTranslations } from '@/lib/catalan-text'

export default function ExploreResultsClient() {
    const searchParams = useSearchParams()

    const hasSingleCountry = searchParams.get('countries')?.split(',').length === 1
    const countryName = hasSingleCountry ? searchParams.get('countries') : null
    const translatedCountry = countryName ? (countryTranslations[countryName] || countryName) : null

    const [movies, setMovies] = useState<Movie[]>([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [metadata, setMetadata] = useState<Metadata | null>(null)
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    // Initial filters from URL
    const [filters, setFilters] = useState({
        genres: searchParams.get('genres')?.split(',').filter(Boolean) || [],
        countries: searchParams.get('countries')?.split(',').filter(Boolean) || [],
        languages: searchParams.get('languages')?.split(',').filter(Boolean) || [],
        minRating: searchParams.get('minRating') ? parseFloat(searchParams.get('minRating')!) : 0,
        beyondHollywood: searchParams.get('beyondHollywood') === 'true',
        yearFrom: searchParams.get('yearFrom') ? parseInt(searchParams.get('yearFrom')!) : undefined,
        yearTo: searchParams.get('yearTo') ? parseInt(searchParams.get('yearTo')!) : undefined
    })

    useEffect(() => {
        const fetchMetadata = async () => {
            const res = await fetch('/api/metadata')
            const data = await res.json()
            if (data.success) {
                setMetadata(data.data)
            }
        }
        fetchMetadata()
    }, [])

    const fetchMovies = async (pageNum: number, currentFilters: any, append = false) => {
        setLoading(true)
        try {
            const params = new URLSearchParams({
                mode: 'search',
                page: pageNum.toString(),
                limit: '20',
                beyondHollywood: currentFilters.beyondHollywood.toString(),
                minRating: (currentFilters.minRating || 0).toString(),
            })

            if (currentFilters.genres?.length > 0) params.append('genres', currentFilters.genres.join(','))
            if (currentFilters.countries?.length > 0) params.append('countries', currentFilters.countries.join(','))
            if (currentFilters.languages?.length > 0) params.append('languages', currentFilters.languages.join(','))
            if (currentFilters.yearFrom) params.append('yearFrom', currentFilters.yearFrom.toString())
            if (currentFilters.yearTo) params.append('yearTo', currentFilters.yearTo.toString())

            const res = await fetch(`/api/discover?${params}`)
            const data = await res.json()

            if (data.success) {
                setMovies(prev => append ? [...prev, ...data.data] : data.data)
            }
        } catch (error) {
            console.error('Error fetching movies:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setPage(1)
        fetchMovies(1, filters)
    }, [filters])

    const handleLoadMore = () => {
        const nextPage = page + 1
        setPage(nextPage)
        fetchMovies(nextPage, filters, true)
    }

    const handleApplyFilters = (newFilters: any) => {
        setFilters(newFilters)
        setIsFilterOpen(false)
    }

    return (
        <div style={{ padding: '2rem 1.5rem', maxWidth: '1400px', margin: '0 auto', minHeight: '100vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: 800, color: '#f1f1f1', margin: 0 }}>
                    {translatedCountry ? `Cinema de ${translatedCountry}` : 'Explora'}
                </h1>
                <button
                    onClick={() => setIsFilterOpen(true)}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: 'rgba(233, 69, 96, 0.15)',
                        color: '#e94560',
                        border: '1px solid #e94560',
                        borderRadius: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                    }}
                >
                    Filtres
                </button>
            </div>

            {movies.length > 0 ? (
                <>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: '2rem'
                    }}>
                        {movies.map(movie => (
                            <MovieCard key={`${movie.id}-${page}`} movie={movie} />
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                        <button
                            onClick={handleLoadMore}
                            disabled={loading}
                            style={{
                                padding: '1rem 2.5rem',
                                background: 'rgba(255, 255, 255, 0.05)',
                                color: '#f1f1f1',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '9999px',
                                fontSize: '1.1rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                            }}
                        >
                            {loading ? 'Carregant...' : 'Càrrega més'}
                        </button>
                    </div>
                </>
            ) : !loading && (
                <div style={{ textAlign: 'center', padding: '5rem 0', color: '#b0b0b0' }}>
                    No hem trobat cap pel·lícula amb aquests filtres.
                </div>
            )}

            {isFilterOpen && metadata && (
                <FilterModal
                    isOpen={isFilterOpen}
                    onClose={() => setIsFilterOpen(false)}
                    onApply={handleApplyFilters}
                    initialFilters={filters}
                    availableGenres={metadata.genres}
                    availableCountries={metadata.countries}
                    hideCountryFilter={true}
                />
            )}
        </div>
    )
}
