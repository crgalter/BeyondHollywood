'use client'

import { useState } from 'react'
import Link from 'next/link'
import { text } from '@/lib/catalan-text'
import NavSearch from './NavSearch'

export default function Navigation() {
    const [isDiscoverOpen, setIsDiscoverOpen] = useState(false)
    const [isProjectOpen, setIsProjectOpen] = useState(false)

    return (
        <nav style={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            background: 'rgba(10, 10, 15, 0.95)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '0 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '64px'
            }}>
                {/* Logo */}
                <Link
                    href="/"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                    }}
                >
                    <span style={{
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        color: '#f1f1f1',
                        letterSpacing: '-0.02em',
                        fontFamily: 'var(--font-heading)'
                    }}>
                        Beyond<span style={{ color: '#e94560', WebkitTextFillColor: '#e94560' }}>Hollywood</span>
                    </span>
                </Link>

                {/* Navigation links */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2rem'
                }}>
                    <Link
                        href="/"
                        style={{
                            color: '#b0b0b0',
                            textDecoration: 'none',
                            fontWeight: 500,
                            transition: 'color 0.3s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#e94560'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#b0b0b0'}
                    >
                        Inici
                    </Link>

                    {/* Discover dropdown */}
                    <div
                        style={{ position: 'relative' }}
                        onMouseEnter={() => setIsDiscoverOpen(true)}
                        onMouseLeave={() => setIsDiscoverOpen(false)}
                    >
                        <button style={{
                            background: 'none',
                            border: 'none',
                            color: '#b0b0b0',
                            fontWeight: 500,
                            fontSize: '1rem',
                            cursor: 'pointer',
                            transition: 'color 0.3s'
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#e94560'}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#b0b0b0'}
                        >
                            Descobreix
                        </button>

                        {isDiscoverOpen && (
                            <div style={{
                                position: 'absolute',
                                top: '100%',
                                right: 0,
                                width: '230px',
                                background: 'rgba(18, 18, 26, 0.98)',
                                backdropFilter: 'blur(12px)',
                                borderRadius: '0.75rem',
                                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.6)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                paddingTop: '0.5rem',
                                paddingBottom: '0.5rem',
                                animation: 'fadeIn 0.2s ease-out'
                            }}>
                                <Link
                                    href="/recomanacions/joies-ocultes"
                                    style={{
                                        display: 'block',
                                        padding: '0.75rem 1.25rem',
                                        color: '#b0b0b0',
                                        textDecoration: 'none',
                                        transition: 'all 0.3s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(233, 69, 96, 0.1)'
                                        e.currentTarget.style.color = '#e94560'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'transparent'
                                        e.currentTarget.style.color = '#b0b0b0'
                                    }}
                                >
                                    <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>Joies Ocultes</div>
                                    <div style={{ fontSize: '0.75rem', color: '#6c757d' }}>
                                        Pel·lícules infravalorades
                                    </div>
                                </Link>

                                <Link
                                    href="/recomanacions/internacional"
                                    style={{
                                        display: 'block',
                                        padding: '0.75rem 1.25rem',
                                        color: '#b0b0b0',
                                        textDecoration: 'none',
                                        transition: 'all 0.3s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(42, 157, 143, 0.1)'
                                        e.currentTarget.style.color = '#2a9d8f'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'transparent'
                                        e.currentTarget.style.color = '#b0b0b0'
                                    }}
                                >
                                    <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>Cinema Internacional</div>
                                    <div style={{ fontSize: '0.75rem', color: '#6c757d' }}>
                                        Més enllà d'Hollywood
                                    </div>
                                </Link>

                                <Link
                                    href="/recomanacions/baix-pressupost"
                                    style={{
                                        display: 'block',
                                        padding: '0.75rem 1.25rem',
                                        color: '#b0b0b0',
                                        textDecoration: 'none',
                                        transition: 'all 0.3s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(6, 255, 165, 0.1)'
                                        e.currentTarget.style.color = '#06ffa5'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'transparent'
                                        e.currentTarget.style.color = '#b0b0b0'
                                    }}
                                >
                                    <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>Baix Pressupost</div>
                                    <div style={{ fontSize: '0.75rem', color: '#6c757d' }}>
                                        Tresors de baix cost
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>

                    <Link
                        href="/surprise"
                        style={{
                            color: '#b0b0b0',
                            textDecoration: 'none',
                            fontWeight: 500,
                            transition: 'color 0.3s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#e94560'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#b0b0b0'}
                    >
                        Sorpren-me
                    </Link>

                    <Link
                        href="/mapamundi"
                        style={{
                            color: '#b0b0b0',
                            textDecoration: 'none',
                            fontWeight: 500,
                            transition: 'color 0.3s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#e94560'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#b0b0b0'}
                    >
                        Mapamundi
                    </Link>

                    {/* Project dropdown */}
                    <div
                        style={{ position: 'relative' }}
                        onMouseEnter={() => setIsProjectOpen(true)}
                        onMouseLeave={() => setIsProjectOpen(false)}
                    >
                        <button style={{
                            background: 'none',
                            border: 'none',
                            color: '#b0b0b0',
                            fontWeight: 500,
                            fontSize: '1rem',
                            cursor: 'pointer',
                            transition: 'color 0.3s'
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#e94560'}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#b0b0b0'}
                        >
                            Sobre el projecte
                        </button>

                        {isProjectOpen && (
                            <div style={{
                                position: 'absolute',
                                top: '100%',
                                right: 0,
                                width: '230px',
                                background: 'rgba(18, 18, 26, 0.98)',
                                backdropFilter: 'blur(12px)',
                                borderRadius: '0.75rem',
                                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.6)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                paddingTop: '0.5rem',
                                paddingBottom: '0.5rem',
                                animation: 'fadeIn 0.2s ease-out'
                            }}>
                                <Link
                                    href="/about"
                                    style={{
                                        display: 'block',
                                        padding: '0.75rem 1.25rem',
                                        color: '#b0b0b0',
                                        textDecoration: 'none',
                                        transition: 'all 0.3s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(233, 69, 96, 0.1)'
                                        e.currentTarget.style.color = '#e94560'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'transparent'
                                        e.currentTarget.style.color = '#b0b0b0'
                                    }}
                                >
                                    <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>Beyond Hollywood</div>
                                    <div style={{ fontSize: '0.75rem', color: '#6c757d' }}>
                                        L'essència del projecte
                                    </div>
                                </Link>

                                <Link
                                    href="/algoritmes"
                                    style={{
                                        display: 'block',
                                        padding: '0.75rem 1.25rem',
                                        color: '#b0b0b0',
                                        textDecoration: 'none',
                                        transition: 'all 0.3s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(233, 69, 96, 0.1)'
                                        e.currentTarget.style.color = '#e94560'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'transparent'
                                        e.currentTarget.style.color = '#b0b0b0'
                                    }}
                                >
                                    <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>Algoritmes</div>
                                    <div style={{ fontSize: '0.75rem', color: '#6c757d' }}>
                                        Bases científiques
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>

                    <NavSearch />
                </div>
            </div>
        </nav>
    )
}
