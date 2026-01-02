'use client'

import { useState, useEffect } from 'react'
import { Movie, Metadata } from '@/lib/types'
import MovieCard from '@/components/MovieCard'
import FilterModal from '@/components/FilterModal'

import Link from 'next/link'

interface SimilarResultsClientProps {
    movieId: number
    seedMovie: Movie
    initialMovies: Movie[]
    metadata: Metadata
}

export default function SimilarResultsClient({
    movieId,
    seedMovie,
    initialMovies,
    metadata
}: SimilarResultsClientProps) {
    const [movies, setMovies] = useState<Movie[]>(initialMovies)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(initialMovies.length === 20)
    const [showFilters, setShowFilters] = useState(false)
    const [filters, setFilters] = useState({
        genres: [] as string[],
        countries: [] as string[],
        minRating: 0,
        beyondHollywood: true
    })

    const fetchMovies = async (pageNum: number, currentFilters: any, append: boolean) => {
        setLoading(true)
        try {
            const params = new URLSearchParams({
                page: pageNum.toString(),
                beyondHollywood: currentFilters.beyondHollywood.toString(),
                limit: '20'
            })
            if (currentFilters.genres.length > 0) params.append('genres', currentFilters.genres.join(','))
            if (currentFilters.countries.length > 0) params.append('countries', currentFilters.countries.join(','))
            if (currentFilters.minRating > 0) params.append('minRating', currentFilters.minRating.toString())

            const res = await fetch(`/api/similar/${movieId}?${params}`)
            const data = await res.json()

            if (data.success) {
                if (append) {
                    setMovies(prev => [...prev, ...data.data])
                } else {
                    setMovies(data.data)
                }
                setHasMore(data.data.length === 20)
            }
        } catch (error) {
            console.error('Fetch error:', error)
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
        <div style={{
            minHeight: '100vh',
            background: '#0a0a0f',
            color: '#f1f1f1'
        }}>
            {/* Header / Hero */}
            <div style={{
                padding: '4rem 1.5rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                background: 'linear-gradient(to bottom, rgba(233, 69, 96, 0.05), transparent)'
            }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                        <Link href={`/pellicula/${seedMovie.id}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', color: 'inherit' }}>
                            <img
                                src={`https://image.tmdb.org/t/p/w185${seedMovie.poster_path}`}
                                alt={seedMovie.title}
                                style={{
                                    width: '100px',
                                    borderRadius: '0.5rem',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                                    transition: 'transform 0.3s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            />
                            <div>
                                <h1 style={{ fontSize: '2.5rem', fontWeight: 700, margin: 0 }}>
                                    Similars a{' '}
                                    <span
                                        style={{
                                            color: '#e94560',
                                            transition: 'all 0.3s',
                                            cursor: 'pointer'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                                        onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                                    >
                                        {seedMovie.title}
                                    </span>
                                </h1>
                                <p style={{ color: '#b0b0b0', marginTop: '0.5rem', fontSize: '1.1rem' }}>
                                    Explorant pel·lícules amb temàtiques i estils semblants
                                </p>
                            </div>
                        </Link>
                    </div>

                    {/* Controls */}
                    <div style={{
                        marginTop: '3rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '1.5rem'
                    }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <button
                                onClick={() => setShowFilters(true)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.75rem 1.5rem',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '0.75rem',
                                    color: '#f1f1f1',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                                </svg>
                                Filtres
                            </button>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem 1.25rem',
                                background: filters.beyondHollywood ? 'rgba(233, 69, 96, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                                borderRadius: '0.75rem',
                                border: `1px solid ${filters.beyondHollywood ? '#e94560' : 'rgba(255, 255, 255, 0.1)'}`,
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                position: 'relative'
                            }}
                                onClick={() => handleApplyFilters({ ...filters, beyondHollywood: !filters.beyondHollywood })}
                                onMouseEnter={(e) => {
                                    const tooltip = e.currentTarget.querySelector('.tooltip') as HTMLElement
                                    if (tooltip) tooltip.style.opacity = '1'
                                    if (tooltip) tooltip.style.visibility = 'visible'
                                }}
                                onMouseLeave={(e) => {
                                    const tooltip = e.currentTarget.querySelector('.tooltip') as HTMLElement
                                    if (tooltip) tooltip.style.opacity = '0'
                                    if (tooltip) tooltip.style.visibility = 'hidden'
                                }}
                            >
                                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: filters.beyondHollywood ? '#f1f1f1' : '#b0b0b0' }}>
                                    Beyond<span style={{ color: '#e94560' }}>Hollywood</span>
                                </span>
                                <div style={{
                                    width: '36px',
                                    height: '20px',
                                    background: filters.beyondHollywood ? '#e94560' : 'rgba(255, 255, 255, 0.2)',
                                    borderRadius: '20px',
                                    position: 'relative',
                                    transition: 'background 0.3s'
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        left: filters.beyondHollywood ? '18px' : '2px',
                                        top: '2px',
                                        width: '16px',
                                        height: '16px',
                                        background: 'white',
                                        borderRadius: '50%',
                                        transition: 'left 0.3s'
                                    }} />
                                </div>

                                {/* Tooltip */}
                                <div className="tooltip" style={{
                                    position: 'absolute',
                                    bottom: 'calc(100% + 10px)',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '240px',
                                    padding: '0.75rem',
                                    background: '#1a1a2e',
                                    border: '1px solid #e94560',
                                    borderRadius: '0.5rem',
                                    fontSize: '0.8rem',
                                    color: '#f1f1f1',
                                    textAlign: 'center',
                                    zIndex: 10,
                                    opacity: 0,
                                    visibility: 'hidden',
                                    transition: 'all 0.3s',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
                                    pointerEvents: 'none'
                                }}>
                                    Descarta les grans superproduccions comercials dels EUA, però manté el cinema independent americà de baix pressupost i tota la cinematografia internacional.
                                    <div style={{
                                        position: 'absolute',
                                        top: '100%',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        border: '6px solid transparent',
                                        borderTopColor: '#e94560'
                                    }} />
                                </div>
                            </div>
                        </div>

                        {filters.genres.length > 0 || filters.countries.length > 0 || filters.minRating > 0 ? (
                            <button
                                onClick={() => handleApplyFilters({ genres: [], countries: [], minRating: 0, beyondHollywood: true })}
                                style={{ background: 'none', border: 'none', color: '#e94560', cursor: 'pointer', fontWeight: 500 }}
                            >
                                Restablir filtres
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>

            {/* Results */}
            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '3rem 1.5rem 6rem' }}>
                {movies.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                            gap: '1.5rem'
                        }}>
                            {movies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>

                        {hasMore && (
                            <div style={{ textAlign: 'center' }}>
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
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '5rem 0' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
                        <h2 style={{ fontSize: '1.5rem', color: '#f1f1f1' }}>No hem trobat resultats amb aquests filtres</h2>
                        <p style={{ color: '#b0b0b0' }}>Prova de relaxar els criteris de cerca.</p>
                    </div>
                )}
            </div>

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
