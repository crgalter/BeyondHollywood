'use client'

import { Movie } from '@/lib/types'
import Link from 'next/link'
import { countryTranslations, genreTranslations } from '@/lib/catalan-text'

interface SurpriseMovieCardProps {
    movie: Movie
}

export default function SurpriseMovieCard({ movie }: SurpriseMovieCardProps) {
    return (
        <Link href={`/pellicula/${movie.id}`} style={{ textDecoration: 'none' }}>
            <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '2rem',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '1000px',
                margin: '0 auto',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                position: 'relative'
            }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)'
                    e.currentTarget.style.borderColor = 'rgba(233, 69, 96, 0.4)'
                    e.currentTarget.style.boxShadow = '0 30px 60px rgba(233, 69, 96, 0.15)'
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)'
                }}
            >
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {/* Poster Section */}
                    <div style={{
                        flex: '1 1 350px',
                        position: 'relative',
                        aspectRatio: '2/3',
                        maxHeight: '600px',
                        overflow: 'hidden'
                    }}>
                        <img
                            src={movie.poster_path ? `https://image.tmdb.org/t/p/w780${movie.poster_path}` : '/no-poster.png'}
                            alt={movie.title}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transition: 'transform 1s'
                            }}
                        />
                        <div style={{
                            position: 'absolute',
                            top: '1.5rem',
                            right: '1.5rem',
                            background: 'rgba(233, 69, 96, 0.9)',
                            padding: '0.5rem 1rem',
                            borderRadius: '9999px',
                            fontWeight: 700,
                            color: 'white',
                            fontSize: '1.1rem',
                            boxShadow: '0 4px 12px rgba(233, 69, 96, 0.3)'
                        }}>
                            {movie.vote_average.toFixed(1)}
                        </div>
                    </div>

                    {/* Content Section */}
                    <div style={{
                        flex: '1 1 500px',
                        padding: '3rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                {movie.production_countries.slice(0, 2).map(c => {
                                    const regionNamesCa = new Intl.DisplayNames(['ca'], { type: 'region' })
                                    let translated = countryTranslations[c] || c
                                    try {
                                        // Try to find if 'c' is already an ISO code or if we can map it
                                        // For now, if it's not in our dictionary, we'll try Intl if it looks like a code
                                        if (c.length === 2) translated = regionNamesCa.of(c) || translated
                                    } catch { }

                                    return (
                                        <span key={c} style={{
                                            color: '#e94560',
                                            fontWeight: 600,
                                            fontSize: '0.9rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.1em'
                                        }}>
                                            {translated}
                                        </span>
                                    )
                                })}
                                <span style={{ color: '#444' }}>•</span>
                                <span style={{ color: '#b0b0b0' }}>{movie.year}</span>
                            </div>

                            <h2 style={{
                                fontSize: '3rem',
                                fontWeight: 800,
                                margin: '0 0 1.5rem 0',
                                lineHeight: 1.1,
                                color: '#f1f1f1'
                            }}>
                                {movie.title}
                            </h2>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                                {movie.genres.map(g => (
                                    <span key={g} style={{
                                        padding: '0.4rem 1rem',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: '9999px',
                                        fontSize: '0.85rem',
                                        color: '#b0b0b0'
                                    }}>
                                        {genreTranslations[g] || g}
                                    </span>
                                ))}
                            </div>

                            <p style={{
                                fontSize: '1.15rem',
                                color: '#d0d0d0',
                                lineHeight: 1.6,
                                marginBottom: '2.5rem',
                                display: '-webkit-box',
                                WebkitLineClamp: 5,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}>
                                {movie.overview}
                            </p>

                            <div style={{
                                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                                paddingTop: '2rem',
                                color: '#b0b0b0',
                                fontSize: '0.95rem',
                                display: 'flex',
                                gap: '2rem'
                            }}>
                                <div>
                                    <div style={{ color: '#666', marginBottom: '0.25rem' }}>Popularitat</div>
                                    <div style={{ fontWeight: 600, color: '#f1f1f1' }}>Baixa ({movie.popularity.toFixed(1)})</div>
                                </div>
                                <div>
                                    <div style={{ color: '#666', marginBottom: '0.25rem' }}>Durada</div>
                                    <div style={{ fontWeight: 600, color: '#f1f1f1' }}>{movie.runtime} min</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
