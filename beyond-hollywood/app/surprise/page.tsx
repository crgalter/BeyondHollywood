'use client'

import { useState, useEffect } from 'react'
import { Movie } from '@/lib/types'
import SurpriseMovieCard from '@/components/SurpriseMovieCard'

export default function SurprisePage() {
    const [movie, setMovie] = useState<Movie | null>(null)
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState({
        beyondHollywood: true,
        hiddenGem: false,
        independent: false
    })

    const fetchSurprise = async () => {
        setLoading(true)
        try {
            const params = new URLSearchParams({
                beyondHollywood: filters.beyondHollywood.toString(),
                hiddenGem: filters.hiddenGem.toString(),
                independent: filters.independent.toString()
            })

            const res = await fetch(`/api/surprise?${params}`)
            const data = await res.json()
            if (data.success) {
                setMovie(data.data)
            } else {
                setMovie(null)
            }
        } catch (error) {
            console.error('Surprise error:', error)
            setMovie(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSurprise()
    }, [filters])

    const selectFilter = (key: keyof typeof filters) => {
        setFilters({
            beyondHollywood: key === 'beyondHollywood',
            hiddenGem: key === 'hiddenGem',
            independent: key === 'independent'
        })
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: '#0a0a0f',
            color: '#f1f1f1',
            padding: '4rem 1.5rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background ambient glow */}
            <div style={{
                position: 'fixed',
                top: '-20%',
                left: '-10%',
                width: '60%',
                height: '60%',
                background: 'radial-gradient(circle, rgba(233, 69, 96, 0.08) 0%, transparent 70%)',
                zIndex: 0,
                pointerEvents: 'none'
            }} />
            <div style={{
                position: 'fixed',
                bottom: '-20%',
                right: '-10%',
                width: '60%',
                height: '60%',
                background: 'radial-gradient(circle, rgba(15, 15, 20, 0.1) 0%, transparent 70%)',
                zIndex: 0,
                pointerEvents: 'none'
            }} />

            <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                        fontWeight: 900,
                        margin: '0 0 1rem 0',
                        letterSpacing: '-0.02em',
                        background: 'linear-gradient(to bottom, #fff, #888)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>
                        Troba la teva propera <span style={{ color: '#e94560' }}>obsessió</span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: '#b0b0b0', maxWidth: '600px', margin: '0 auto' }}>
                        Deixa el comandament, nosaltres triem per tu. Cinema de qualitat que se t'hauria escapat.
                    </p>
                </div>

                {/* Filters / Toggles */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1rem',
                    marginBottom: '4rem',
                    flexWrap: 'wrap'
                }}>
                    <ToggleButton
                        label={<>Beyond<span style={{ color: filters.beyondHollywood ? '#e94560' : '#888' }}>Hollywood</span></>}
                        active={filters.beyondHollywood}
                        onClick={() => selectFilter('beyondHollywood')}
                        description="Exclou les superproduccions comercials, però manté el cinema independent dels EUA i tota la producció internacional."
                    />
                    <ToggleButton
                        label="Joies amagades"
                        active={filters.hiddenGem}
                        onClick={() => selectFilter('hiddenGem')}
                        description="Pel·lícules d'alta qualitat que han passat desapercebudes pel gran públic."
                    />
                    <ToggleButton
                        label="Cinema independent"
                        active={filters.independent}
                        onClick={() => selectFilter('independent')}
                        description="Produccions creatives i autèntiques fetes amb recursos limitats."
                    />
                </div>

                {/* Movie Display */}
                <div style={{
                    minHeight: '600px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '3rem'
                }}>
                    {loading ? (
                        <div style={{ textAlign: 'center' }}>
                            <div className="spinner" style={{
                                width: '60px',
                                height: '60px',
                                border: '4px solid rgba(233, 69, 96, 0.1)',
                                borderTopColor: '#e94560',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite',
                                margin: '0 auto 2rem'
                            }} />
                            <p style={{ color: '#b0b0b0', fontSize: '1.1rem', fontStyle: 'italic' }}>
                                Buscant entre milers de pel·lícules...
                            </p>
                        </div>
                    ) : movie ? (
                        <>
                            <SurpriseMovieCard movie={movie} />
                            <div style={{ textAlign: 'center' }}>
                                <button
                                    onClick={fetchSurprise}
                                    style={{
                                        padding: '1.25rem 3rem',
                                        background: 'linear-gradient(to right, #e94560, #ff6b81)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '9999px',
                                        fontSize: '1.1rem',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        transition: 'all 0.3s',
                                        boxShadow: '0 10px 25px rgba(233, 69, 96, 0.4)',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.05)'
                                        e.currentTarget.style.boxShadow = '0 15px 35px rgba(233, 69, 96, 0.5)'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)'
                                        e.currentTarget.style.boxShadow = '0 10px 25px rgba(233, 69, 96, 0.4)'
                                    }}
                                >
                                    Una altra sorpresa
                                </button>
                            </div>
                        </>
                    ) : (
                        <div style={{ textAlign: 'center' }}>
                            <p>No hem trobat cap pel·lícula amb aquests filtres.</p>
                            <button onClick={fetchSurprise} style={{ color: '#e94560', background: 'none', border: 'none', cursor: 'pointer' }}>
                                Torna-ho a provar
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
        </div>
    )
}

function ToggleButton({ label, active, onClick, disabled, description }: { label: React.ReactNode, active: boolean, onClick: () => void, disabled?: boolean, description: string }) {
    return (
        <div style={{ position: 'relative' }}
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
            <button
                onClick={onClick}
                disabled={disabled}
                style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '9999px',
                    border: '1px solid',
                    borderColor: active ? '#e94560' : 'rgba(255, 255, 255, 0.1)',
                    background: active ? 'rgba(233, 69, 96, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    color: active ? '#e94560' : '#b0b0b0',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: disabled ? 'default' : 'pointer',
                    transition: 'all 0.3s',
                    opacity: disabled ? 0.3 : 1
                }}
            >
                {label}
            </button>
            <div className="tooltip" style={{
                position: 'absolute',
                bottom: 'calc(100% + 12px)',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '200px',
                padding: '0.75rem',
                background: '#1a1a2e',
                border: '1px solid #e94560',
                borderRadius: '0.75rem',
                fontSize: '0.8rem',
                color: '#f1f1f1',
                textAlign: 'center',
                zIndex: 100,
                opacity: 0,
                visibility: 'hidden',
                transition: 'all 0.3s',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
                pointerEvents: 'none',
                lineHeight: 1.4
            }}>
                {description}
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
    )
}
