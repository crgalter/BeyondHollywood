'use client'

import React, { useState } from 'react'
import MapChart from '@/components/MapChart'
import Link from 'next/link'
import { genreTranslations, languageTranslations } from '@/lib/catalan-text'

export default function MapPage() {
    const [tooltipContent, setTooltipContent] = useState("")
    const [selectedCountry, setSelectedCountry] = useState<any>(null)
    const [beyondHollywood, setBeyondHollywood] = useState(true)
    const [decade, setDecade] = useState("") // "" means all time

    const handleCountryClick = (name: string, stats: any) => {
        setSelectedCountry({ name, ...stats })
    }

    const decades = [
        { label: 'Tots', value: '' },
        { label: '2020s', value: '2020' },
        { label: '2010s', value: '2010' },
        { label: '2000s', value: '2000' },
        { label: '1990s', value: '1990' },
        { label: '1980s', value: '1980' },
        { label: '1970s', value: '1970' },
    ]

    return (
        <div style={{
            height: 'calc(100vh - 64px)',
            background: '#0a0a0f',
            display: 'flex',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Main Map Area */}
            <div style={{ flex: 1, position: 'relative' }}>
                <MapChart
                    setTooltipContent={setTooltipContent}
                    onCountryClick={handleCountryClick}
                    beyondHollywood={beyondHollywood}
                    decade={decade}
                />

                {tooltipContent && (
                    <div style={{
                        position: 'absolute',
                        bottom: '2rem',
                        left: '2rem',
                        background: 'rgba(26, 26, 46, 0.9)',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #e94560',
                        color: 'white',
                        pointerEvents: 'none',
                        zIndex: 10,
                        whiteSpace: 'pre-line'
                    }}>
                        {tooltipContent}
                    </div>
                )}

                {/* Controls Overlay */}
                <div style={{
                    position: 'absolute',
                    top: '2rem',
                    left: '2rem',
                    background: 'rgba(26, 26, 46, 0.8)',
                    padding: '1.5rem',
                    borderRadius: '1rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    zIndex: 20
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontSize: '0.9rem', color: '#b0b0b0', fontWeight: 600 }}>
                            Beyond<span style={{ color: '#e94560' }}>Hollywood</span>
                        </span>
                        <input
                            type="checkbox"
                            checked={beyondHollywood}
                            onChange={(e) => setBeyondHollywood(e.target.checked)}
                            style={{ width: '18px', height: '18px' }}
                        />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem' }}>Dècada</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', maxWidth: '200px' }}>
                            {decades.map(d => (
                                <button
                                    key={d.value}
                                    onClick={() => setDecade(d.value)}
                                    style={{
                                        padding: '0.25rem 0.5rem',
                                        fontSize: '0.75rem',
                                        background: decade === d.value ? '#e94560' : 'rgba(255,255,255,0.05)',
                                        color: decade === d.value ? 'white' : '#b0b0b0',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {d.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Legend */}
                    <div style={{ marginTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
                        <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.75rem', textTransform: 'uppercase' }}>Nombre de Pel·lícules</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#b0b0b0' }}>
                                <div style={{ width: '12px', height: '12px', background: '#ff00ff', borderRadius: '2px' }} />
                                <span>Més de 500</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#b0b0b0' }}>
                                <div style={{ width: '12px', height: '12px', background: '#ff2e63', borderRadius: '2px' }} />
                                <span>101 - 500</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#b0b0b0' }}>
                                <div style={{ width: '12px', height: '12px', background: '#e94560', borderRadius: '2px' }} />
                                <span>20 - 100</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#b0b0b0' }}>
                                <div style={{ width: '12px', height: '12px', background: '#2d1b3d', borderRadius: '2px' }} />
                                <span>1 - 19 (Nova mirada)</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#b0b0b0' }}>
                                <div style={{ width: '12px', height: '12px', background: '#16213e', borderRadius: '2px' }} />
                                <span>Cap disponible</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Side Panel */}
            <div style={{
                width: selectedCountry ? '400px' : '0',
                background: '#16213e',
                borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'width 0.3s ease-in-out',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {selectedCountry && (
                    <div style={{ padding: '2rem', minWidth: '400px' }}>
                        <button
                            onClick={() => setSelectedCountry(null)}
                            style={{
                                background: 'none', border: 'none', color: '#666',
                                cursor: 'pointer', marginBottom: '1rem', fontSize: '1.2rem'
                            }}
                        >
                            ✕ Tancar
                        </button>

                        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#f1f1f1', marginBottom: '0.5rem' }}>
                            {selectedCountry.name}
                        </h2>
                        <p style={{ color: '#e94560', fontWeight: 600, marginBottom: '2rem' }}>
                            {selectedCountry.count} pel·lícules trobades
                        </p>

                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '0.9rem', color: '#666', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Idiomes principals</h3>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                {selectedCountry.languages.map((l: string) => (
                                    <span key={l} style={{ padding: '0.2rem 0.6rem', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', fontSize: '0.8rem' }}>
                                        {languageTranslations[l] || l}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '0.9rem', color: '#666', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Gèneres més freqüents</h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {selectedCountry.topGenres.map((g: string) => (
                                    <span key={g} style={{ padding: '0.2rem 0.6rem', border: '1px solid rgba(233, 69, 96, 0.3)', color: '#e94560', borderRadius: '4px', fontSize: '0.8rem' }}>
                                        {genreTranslations[g] || g}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginBottom: '3rem' }}>
                            <h3 style={{ fontSize: '0.9rem', color: '#666', textTransform: 'uppercase', marginBottom: '1rem' }}>Pel·lícules destacades</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                                {selectedCountry.topMovies.map((m: any) => (
                                    <Link key={m.id} href={`/pellicula/${m.id}`}>
                                        <div style={{ borderRadius: '0.5rem', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s' }}>
                                            <img
                                                src={m.poster_path ? `https://image.tmdb.org/t/p/w342${m.poster_path}` : '/no-poster.png'}
                                                alt={m.title}
                                                style={{ width: '100%', height: 'auto', display: 'block' }}
                                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                            />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <Link href={`/explora?countries=${selectedCountry.name}&beyondHollywood=${beyondHollywood}${decade ? `&yearFrom=${decade}&yearTo=${parseInt(decade) + 9}` : ''}`}>
                            <button style={{
                                width: '100%',
                                padding: '1rem',
                                background: '#e94560',
                                color: 'white',
                                border: 'none',
                                borderRadius: '0.75rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                fontSize: '1rem'
                            }}>
                                Veure totes les pel·lícules
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
