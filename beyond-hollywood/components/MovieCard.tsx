'use client'

import Link from 'next/link'
import { Movie } from '@/lib/types'
import { genreTranslations, formatNumber, countryTranslations } from '@/lib/catalan-text'

interface MovieCardProps {
    movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
        : '/placeholder-poster.png'

    const countryName = movie.production_countries.length > 0
        ? countryTranslations[movie.production_countries[0]] || movie.production_countries[0]
        : null

    return (
        <Link href={`/pellicula/${movie.id}`} style={{ textDecoration: 'none' }}>
            <div style={{
                cursor: 'pointer',
                transition: 'transform 0.3s, box-shadow 0.3s',
            }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'
                    e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 20px rgba(233, 69, 96, 0.3)'
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)'
                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
                }}
            >
                {/* Poster Container */}
                <div style={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '0.75rem',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
                    background: '#1a1a2e'
                }}>
                    {/* Poster Image */}
                    <div style={{
                        aspectRatio: '2/3',
                        background: '#12121a'
                    }}>
                        <img
                            src={posterUrl}
                            alt={movie.title}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                            loading="lazy"
                        />
                    </div>

                    {/* Rating badge */}
                    {movie.vote_average > 0 && (
                        <div style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            backdropFilter: 'blur(12px)',
                            padding: '6px 12px',
                            borderRadius: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                            <span style={{ color: '#f4a261', fontSize: '1.125rem' }}>★</span>
                            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'white' }}>
                                {movie.vote_average.toFixed(1)}
                            </span>
                        </div>
                    )}
                </div>

                {/* Info Section */}
                <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <h3 style={{
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        lineHeight: 1.3,
                        color: '#f1f1f1',
                        margin: 0,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        transition: 'color 0.3s'
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#e94560'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#f1f1f1'}
                    >
                        {movie.title}
                    </h3>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontSize: '0.7rem',
                        color: '#b0b0b0'
                    }}>
                        {movie.year && <span>{movie.year}</span>}
                        {movie.year && movie.runtime > 0 && <span>·</span>}
                        {movie.runtime > 0 && <span>{movie.runtime} min</span>}
                        {(movie.year || movie.runtime > 0) && countryName && <span>·</span>}
                        {countryName && (
                            <span style={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}>
                                {countryName}
                            </span>
                        )}
                    </div>

                    {movie.vote_count > 0 && (
                        <div style={{ fontSize: '0.75rem', color: '#6c757d' }}>
                            {formatNumber(movie.vote_count)} vots
                        </div>
                    )}

                    {/* Genres */}
                    {movie.genres.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', paddingTop: '0.25rem' }}>
                            {movie.genres.slice(0, 2).map((genre) => (
                                <span
                                    key={genre}
                                    style={{
                                        fontSize: '0.65rem',
                                        padding: '2px 8px',
                                        background: 'rgba(18, 18, 26, 0.6)',
                                        backdropFilter: 'blur(4px)',
                                        borderRadius: '9999px',
                                        color: '#b0b0b0',
                                        border: '1px solid rgba(255, 255, 255, 0.1)'
                                    }}
                                >
                                    {genreTranslations[genre] || genre}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    )
}
