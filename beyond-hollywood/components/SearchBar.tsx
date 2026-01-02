'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { AutocompleteResult } from '@/lib/autocomplete'

export default function SearchBar() {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<AutocompleteResult[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.trim().length >= 2) {
                setIsLoading(true)
                try {
                    const res = await fetch(`/api/autocomplete?q=${encodeURIComponent(query)}&limit=6`)
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
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (results.length > 0) {
            selectMovie(results[0])
        } else if (query.trim()) {
            setIsOpen(false)
            router.push(`/cerca?q=${encodeURIComponent(query.trim())}`)
        }
    }

    const selectMovie = (movie: AutocompleteResult) => {
        setQuery(movie.title)
        setIsOpen(false)
        router.push(`/semblants/${movie.id}`)
    }

    return (
        <div ref={containerRef} style={{
            position: 'relative',
            maxWidth: '600px',
            margin: '0 auto',
            width: '100%'
        }}>
            <form onSubmit={handleSearch} style={{
                display: 'flex',
                gap: '0.75rem',
            }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Escriu una pel·lícula que t'hagi agradat..."
                        style={{
                            width: '100%',
                            padding: '1rem 1.5rem',
                            fontSize: '1rem',
                            background: 'rgba(255, 255, 255, 0.08)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            borderRadius: '9999px',
                            color: '#f1f1f1',
                            outline: 'none',
                            transition: 'all 0.3s'
                        }}
                        onFocus={() => {
                            if (results.length > 0) setIsOpen(true)
                        }}
                    />
                    {isLoading && (
                        <div style={{
                            position: 'absolute',
                            right: '1.25rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '18px',
                            height: '18px',
                            border: '2px solid rgba(233, 69, 96, 0.3)',
                            borderTopColor: '#e94560',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                        }} />
                    )}
                </div>
                <button
                    type="submit"
                    style={{
                        padding: '1rem 2rem',
                        background: 'linear-gradient(to right, #e94560, #ff6b81)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '9999px',
                        fontWeight: 600,
                        fontSize: '1rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.4)'
                    }}
                >
                    Cerca
                </button>
            </form>

            <style>{`
                @keyframes spin { to { transform: translateY(-50%) rotate(360deg); } }
            `}</style>

            {/* Autocomplete Dropdown */}
            {isOpen && results.length > 0 && (
                <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 0.5rem)',
                    left: 0,
                    right: 0,
                    background: 'rgba(15, 15, 20, 0.95)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    zIndex: 1000,
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
                }}>
                    {results.map((movie) => (
                        <div
                            key={movie.id}
                            onClick={() => selectMovie(movie)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '0.75rem 1rem',
                                cursor: 'pointer',
                                transition: 'background 0.2s',
                                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(233, 69, 96, 0.15)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                            <img
                                src={movie.poster_path ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` : '/no-poster.png'}
                                alt={movie.title}
                                style={{
                                    width: '36px',
                                    height: '54px',
                                    objectFit: 'cover',
                                    borderRadius: '4px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                }}
                            />
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                                <div style={{ color: '#f1f1f1', fontWeight: 500, fontSize: '0.95rem', lineHeight: 1.2 }}>{movie.title}</div>
                                {movie.year && <div style={{ color: '#b0b0b0', fontSize: '0.8rem', lineHeight: 1.2 }}>{movie.year}</div>}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
