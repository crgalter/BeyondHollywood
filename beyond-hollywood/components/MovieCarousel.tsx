'use client'

import { useRef } from 'react'
import MovieCard from './MovieCard'
import { Movie } from '@/lib/types'
import Link from 'next/link'

interface MovieCarouselProps {
    title: string
    subtitle?: string
    movies: Movie[]
    viewMoreLink?: string
}

export default function MovieCarousel({ title, subtitle, movies, viewMoreLink }: MovieCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
            const scrollAmount = window.innerWidth > 768 ? 600 : 300

            if (direction === 'left') {
                if (scrollLeft <= 5) {
                    // Wrap to end
                    scrollRef.current.scrollTo({
                        left: scrollWidth - clientWidth,
                        behavior: 'smooth'
                    })
                } else {
                    scrollRef.current.scrollBy({
                        left: -scrollAmount,
                        behavior: 'smooth'
                    })
                }
            } else {
                if (scrollLeft + clientWidth >= scrollWidth - 5) {
                    // Wrap to beginning
                    scrollRef.current.scrollTo({
                        left: 0,
                        behavior: 'smooth'
                    })
                } else {
                    scrollRef.current.scrollBy({
                        left: scrollAmount,
                        behavior: 'smooth'
                    })
                }
            }
        }
    }

    if (movies.length === 0) return null

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                paddingRight: '1rem'
            }}>
                <div>
                    <h2 style={{
                        fontSize: '1.75rem',
                        fontWeight: 700,
                        color: '#f1f1f1',
                        margin: 0
                    }}>{title}</h2>
                    {subtitle && <p style={{
                        color: '#e94560',
                        fontSize: '0.8rem',
                        marginTop: '0.15rem',
                        fontWeight: 500,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase'
                    }}>{subtitle}</p>}
                </div>

                {viewMoreLink && (
                    <Link href={viewMoreLink} style={{
                        color: '#b0b0b0',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        padding: '6px 12px',
                        borderRadius: '0.5rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        transition: 'all 0.3s',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#e94560'
                            e.currentTarget.style.background = 'rgba(233, 69, 96, 0.1)'
                            e.currentTarget.style.borderColor = 'rgba(233, 69, 96, 0.3)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = '#b0b0b0'
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                        }}
                    >
                        Veure més →
                    </Link>
                )}
            </div>

            {/* Carousel */}
            <div style={{ position: 'relative' }}>
                {/* Left arrow */}
                <button
                    onClick={() => scroll('left')}
                    style={{
                        position: 'absolute',
                        left: '-20px',
                        top: '40%',
                        transform: 'translateY(-50%)',
                        zIndex: 10,
                        background: 'rgba(233, 69, 96, 0.8)',
                        color: 'white',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                        transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'
                        e.currentTarget.style.backgroundColor = '#e94560'
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
                        e.currentTarget.style.backgroundColor = 'rgba(233, 69, 96, 0.8)'
                    }}
                    aria-label="Scroll left"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Scrollable container */}
                <div
                    ref={scrollRef}
                    style={{
                        display: 'flex',
                        gap: '1.25rem',
                        overflowX: 'auto',
                        paddingBottom: '1rem',
                        paddingLeft: '0.25rem',
                        paddingRight: '0.25rem',
                        scrollBehavior: 'smooth',
                        msOverflowStyle: 'none',
                        scrollbarWidth: 'none'
                    }}
                >
                    {movies.map((movie) => (
                        <div key={movie.id} style={{ flex: '0 0 auto', width: '180px' }}>
                            <MovieCard movie={movie} />
                        </div>
                    ))}
                </div>

                {/* Right arrow */}
                <button
                    onClick={() => scroll('right')}
                    style={{
                        position: 'absolute',
                        right: '-20px',
                        top: '40%',
                        transform: 'translateY(-50%)',
                        zIndex: 10,
                        background: 'rgba(233, 69, 96, 0.8)',
                        color: 'white',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                        transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'
                        e.currentTarget.style.backgroundColor = '#e94560'
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
                        e.currentTarget.style.backgroundColor = 'rgba(233, 69, 96, 0.8)'
                    }}
                    aria-label="Scroll right"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
