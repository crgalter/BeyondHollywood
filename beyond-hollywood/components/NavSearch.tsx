'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { AutocompleteResult } from '@/lib/autocomplete'

export default function NavSearch() {
    const [isExpanded, setIsExpanded] = useState(false)
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<AutocompleteResult[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.trim().length >= 2) {
                setIsLoading(true)
                try {
                    const res = await fetch(`/api/autocomplete?q=${encodeURIComponent(query)}&limit=5`)
                    const data = await res.json()
                    if (data.success) {
                        setResults(data.data)
                        setIsOpen(true)
                    }
                } catch (error) {
                    console.error('Autocomplete error:', error)
                } finally {
                    setIsLoading(false)
                }
            } else {
                setResults([])
                setIsOpen(false)
            }
        }, 300)

        return () => clearTimeout(timer)
    }, [query])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsExpanded(false)
                setIsOpen(false)
                setQuery('')
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    useEffect(() => {
        if (isExpanded && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isExpanded])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (results.length > 0) {
            selectMovie(results[0])
        } else if (query.trim()) {
            setIsExpanded(false)
            setIsOpen(false)
            router.push(`/cerca?q=${encodeURIComponent(query.trim())}`)
        }
    }

    const selectMovie = (movie: AutocompleteResult) => {
        setQuery('')
        setIsExpanded(false)
        setIsOpen(false)
        router.push(`/semblants/${movie.id}`)
    }

    return (
        <div ref={containerRef} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                background: isExpanded ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                borderRadius: '9999px',
                padding: isExpanded ? '0.25rem 0.75rem' : '0',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                border: isExpanded ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid transparent',
                width: isExpanded ? '250px' : '40px',
                height: '40px',
                overflow: 'hidden'
            }}>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: isExpanded ? '#e94560' : '#b0b0b0',
                        cursor: 'pointer',
                        padding: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'color 0.3s',
                        zIndex: 2
                    }}
                    onMouseEnter={(e) => !isExpanded && (e.currentTarget.style.color = '#e94560')}
                    onMouseLeave={(e) => !isExpanded && (e.currentTarget.style.color = '#b0b0b0')}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </button>

                <form onSubmit={handleSearch} style={{ flex: 1, display: 'flex', opacity: isExpanded ? 1 : 0, transition: 'opacity 0.2s', marginLeft: '0.25rem' }}>
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Cerca..."
                        style={{
                            width: '100%',
                            background: 'none',
                            border: 'none',
                            color: '#f1f1f1',
                            fontSize: '0.9rem',
                            outline: 'none',
                            padding: '0.25rem 0'
                        }}
                    />
                </form>

                {isLoading && isExpanded && (
                    <div style={{
                        width: '14px',
                        height: '14px',
                        border: '2px solid rgba(233, 69, 96, 0.3)',
                        borderTopColor: '#e94560',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        marginLeft: '0.25rem'
                    }} />
                )}
            </div>

            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>

            {/* Dropdown Results */}
            {isOpen && results.length > 0 && isExpanded && (
                <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 0.75rem)',
                    right: 0,
                    width: '300px',
                    background: 'rgba(15, 15, 20, 0.98)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    zIndex: 1100,
                    boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.7)'
                }}>
                    {results.map((movie) => (
                        <div
                            key={movie.id}
                            onClick={() => selectMovie(movie)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.875rem',
                                padding: '0.75rem 1rem',
                                cursor: 'pointer',
                                transition: 'background 0.2s',
                                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(233, 69, 96, 0.12)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                            <img
                                src={movie.poster_path ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` : '/no-poster.png'}
                                alt={movie.title}
                                style={{
                                    width: '32px',
                                    height: '48px',
                                    objectFit: 'cover',
                                    borderRadius: '4px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.05)'
                                }}
                            />
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px', overflow: 'hidden' }}>
                                <div style={{
                                    color: '#f1f1f1',
                                    fontWeight: 500,
                                    fontSize: '0.875rem',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    lineHeight: 1.2,
                                    width: '100%'
                                }}>
                                    {movie.title}
                                </div>
                                {movie.year && <div style={{ color: '#b0b0b0', fontSize: '0.75rem', lineHeight: 1.2 }}>{movie.year}</div>}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
