'use client'

import { useState } from 'react'
import { genreTranslations, countryTranslations } from '@/lib/catalan-text'

interface FilterModalProps {
    isOpen: boolean
    onClose: () => void
    onApply: (filters: any) => void
    initialFilters: any
    availableGenres: string[]
    availableCountries: string[]
    hideCountryFilter?: boolean
}

export default function FilterModal({
    isOpen,
    onClose,
    onApply,
    initialFilters,
    availableGenres,
    availableCountries,
    hideCountryFilter = false
}: FilterModalProps) {
    const [filters, setFilters] = useState(initialFilters)

    if (!isOpen) return null

    const toggleGenre = (genre: string) => {
        setFilters((prev: any) => ({
            ...prev,
            genres: prev.genres.includes(genre)
                ? prev.genres.filter((g: string) => g !== genre)
                : [...prev.genres, genre]
        }))
    }

    const toggleCountry = (country: string) => {
        setFilters((prev: any) => ({
            ...prev,
            countries: prev.countries.includes(country)
                ? prev.countries.filter((c: string) => c !== country)
                : [...prev.countries, country]
        }))
    }

    const resetFilters = () => {
        setFilters({
            genres: [],
            countries: [],
            minRating: 0,
            beyondHollywood: true,
            yearFrom: undefined,
            yearTo: undefined
        })
    }

    // Sort genres by translated name
    const sortedGenres = Array.isArray(availableGenres) ? [...availableGenres].sort((a, b) =>
        (genreTranslations[a] || a).localeCompare(genreTranslations[b] || b)
    ) : []

    const countries = Array.isArray(availableCountries) ? availableCountries : []

    // Common countries to show
    const commonCountries = [
        'France', 'Japan', 'South Korea', 'Germany', 'Spain',
        'Italy', 'Hong Kong', 'India', 'Brazil', 'Mexico',
        'Argentina', 'China', 'United Kingdom', 'Canada'
    ].filter(c => countries.includes(c))

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)'
        }}>
            <div style={{
                background: '#12121a',
                width: '100%',
                maxWidth: '600px',
                maxHeight: '90vh',
                borderRadius: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                {/* Header */}
                <div style={{
                    padding: '1.5rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, color: '#f1f1f1' }}>Filtres</h2>
                    <button
                        onClick={onClose}
                        style={{ background: 'none', border: 'none', color: '#b0b0b0', cursor: 'pointer', fontSize: '1.5rem' }}
                    >
                        &times;
                    </button>
                </div>

                {/* Body */}
                <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Beyond Hollywood Toggle */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '1rem',
                        background: 'rgba(233, 69, 96, 0.1)',
                        borderRadius: '0.75rem',
                        border: '1px solid rgba(233, 69, 96, 0.2)',
                    }}>
                        <div>
                            <div style={{ fontWeight: 600, color: '#f1f1f1' }}>
                                Filtre Beyond<span style={{ color: '#e94560' }}>Hollywood</span>
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#b0b0b0', maxWidth: '350px', marginTop: '0.25rem' }}>
                                Aquest filtre prioritza el cinema internacional i independent. Descarta les grans superproduccions comercials dels EUA, però manté el cinema d'autor americà de baix pressupost.
                            </div>
                        </div>
                        <input
                            type="checkbox"
                            checked={filters.beyondHollywood}
                            onChange={(e) => setFilters((prev: any) => ({ ...prev, beyondHollywood: e.target.checked }))}
                            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                        />
                    </div>

                    {/* Genres */}
                    <div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: '#f1f1f1' }}>Gèneres</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {sortedGenres.map(genre => (
                                <button
                                    key={genre}
                                    onClick={() => toggleGenre(genre)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.85rem',
                                        border: '1px solid',
                                        borderColor: filters.genres.includes(genre) ? '#e94560' : 'rgba(255, 255, 255, 0.1)',
                                        background: filters.genres.includes(genre) ? 'rgba(233, 69, 96, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                                        color: filters.genres.includes(genre) ? '#e94560' : '#b0b0b0',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {genreTranslations[genre] || genre}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Decade */}
                    <div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: '#f1f1f1' }}>Dècada</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                            {[
                                { label: 'Totes', from: undefined, to: undefined },
                                { label: '2020s', from: 2020, to: 2029 },
                                { label: '2010s', from: 2010, to: 2019 },
                                { label: '2000s', from: 2000, to: 2009 },
                                { label: '1990s', from: 1990, to: 1999 },
                                { label: '1980s', from: 1980, to: 1989 },
                                { label: '1970s', from: 1970, to: 1979 },
                                { label: 'Anterior', from: 1900, to: 1969 },
                            ].map((d) => (
                                <button
                                    key={d.label}
                                    onClick={() => setFilters((prev: any) => ({ ...prev, yearFrom: d.from, yearTo: d.to }))}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.85rem',
                                        border: '1px solid',
                                        borderColor: filters.yearFrom === d.from ? '#e94560' : 'rgba(255, 255, 255, 0.1)',
                                        background: filters.yearFrom === d.from ? 'rgba(233, 69, 96, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                                        color: filters.yearFrom === d.from ? '#e94560' : '#b0b0b0',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {d.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Countries */}
                    {!hideCountryFilter && (
                        <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: '#f1f1f1' }}>Països destacats</h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {commonCountries.map(country => (
                                    <button
                                        key={country}
                                        onClick={() => toggleCountry(country)}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            borderRadius: '9999px',
                                            fontSize: '0.85rem',
                                            border: '1px solid',
                                            borderColor: filters.countries.includes(country) ? '#e94560' : 'rgba(255, 255, 255, 0.1)',
                                            background: filters.countries.includes(country) ? 'rgba(233, 69, 96, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                                            color: filters.countries.includes(country) ? '#e94560' : '#b0b0b0',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {countryTranslations[country] || country}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Min Rating */}
                    <div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: '#f1f1f1' }}>Valoració mínima: {filters.minRating}</h3>
                        <input
                            type="range"
                            min="0"
                            max="9"
                            step="0.5"
                            value={filters.minRating}
                            onChange={(e) => setFilters((prev: any) => ({ ...prev, minRating: parseFloat(e.target.value) }))}
                            style={{ width: '100%', accentColor: '#e94560' }}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div style={{
                    padding: '1.5rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    gap: '1rem'
                }}>
                    <button
                        onClick={resetFilters}
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            borderRadius: '0.75rem',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            background: 'transparent',
                            color: '#b0b0b0',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        Esborrar tot
                    </button>
                    <button
                        onClick={() => {
                            onApply(filters)
                            onClose()
                        }}
                        style={{
                            flex: 2,
                            padding: '0.75rem',
                            borderRadius: '0.75rem',
                            border: 'none',
                            background: 'linear-gradient(to right, #e94560, #ff6b81)',
                            color: 'white',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        Aplicar Filtres
                    </button>
                </div>
            </div>
        </div>
    )
}
