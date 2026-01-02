'use client'

import { useState } from 'react'
import { Movie } from '@/lib/types'
import MovieCard from './MovieCard'

interface SimilarMoviesSectionProps {
    movieId: number
    initialMovies: Movie[]
}

export default function SimilarMoviesSection({ movieId, initialMovies }: SimilarMoviesSectionProps) {
    const [movies, setMovies] = useState<Movie[]>(initialMovies)
    const [beyondHollywood, setBeyondHollywood] = useState(true)
    const [loading, setLoading] = useState(false)

    const toggleFilter = async () => {
        const newValue = !beyondHollywood
        setBeyondHollywood(newValue)
        setLoading(true)

        try {
            const params = new URLSearchParams({
                beyondHollywood: newValue.toString(),
                limit: '12'
            })
            const res = await fetch(`/api/similar/${movieId}?${params}`)
            const data = await res.json()
            if (data.success) {
                setMovies(data.data)
            }
        } catch (error) {
            console.error('Error toggling similar movies filter:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '4rem 1.5rem'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <h2 style={{
                    fontSize: '2rem',
                    fontWeight: 700,
                    margin: 0,
                    color: '#f1f1f1'
                }}>
                    Pel·lícules Similars
                </h2>

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.6rem 1rem',
                        background: beyondHollywood ? 'rgba(233, 69, 96, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '0.75rem',
                        border: `1px solid ${beyondHollywood ? '#e94560' : 'rgba(255, 255, 255, 0.1)'}`,
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        position: 'relative'
                    }}
                    onClick={toggleFilter}
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
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: beyondHollywood ? '#f1f1f1' : '#b0b0b0' }}>
                        Beyond<span style={{ color: '#e94560' }}>Hollywood</span>
                    </span>
                    <div style={{
                        width: '32px',
                        height: '18px',
                        background: beyondHollywood ? '#e94560' : 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '20px',
                        position: 'relative',
                        transition: 'background 0.3s'
                    }}>
                        <div style={{
                            position: 'absolute',
                            left: beyondHollywood ? '16px' : '2px',
                            top: '2px',
                            width: '14px',
                            height: '14px',
                            background: 'white',
                            borderRadius: '50%',
                            transition: 'left 0.3s'
                        }} />
                    </div>

                    {/* Tooltip */}
                    <div className="tooltip" style={{
                        position: 'absolute',
                        bottom: 'calc(100% + 10px)',
                        right: '0',
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
                        Prioritza el cinema internacional i d'autor. Descarta els blockbusters americans però manté el cinema independent dels EUA de baix pressupost.
                        <div style={{
                            position: 'absolute',
                            top: '100%',
                            right: '20px',
                            border: '6px solid transparent',
                            borderTopColor: '#e94560'
                        }} />
                    </div>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                gap: '1.5rem',
                opacity: loading ? 0.5 : 1,
                transition: 'opacity 0.2s'
            }}>
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
                {movies.length === 0 && !loading && (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 0', color: '#b0b0b0' }}>
                        No s'han trobat pel·lícules similars amb aquest filtre.
                    </div>
                )}
            </div>
        </div>
    )
}
