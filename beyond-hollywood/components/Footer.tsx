'use client'

import React from 'react'
import Link from 'next/link'

export default function Footer() {
    return (
        <footer style={{
            background: '#12121a',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '3rem 1.5rem',
            marginTop: 'auto'
        }}>
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                alignItems: 'center',
                textAlign: 'center'
            }}>
                {/* Logo */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '1rem'
                }}>
                    <span style={{
                        fontSize: '1.2rem',
                        fontWeight: 800,
                        color: '#f1f1f1',
                    }}>
                        Beyond<span style={{ color: '#e94560' }}>Hollywood</span>
                    </span>
                </div>

                {/* Links */}
                <div style={{
                    display: 'flex',
                    gap: '2rem',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                }}>
                    <Link
                        href="/about"
                        style={{
                            color: '#b0b0b0',
                            textDecoration: 'none',
                            transition: 'color 0.3s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#e94560'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#b0b0b0'}
                    >
                        Sobre Beyond Hollywood
                    </Link>

                    <Link
                        href="/contact"
                        style={{
                            color: '#b0b0b0',
                            textDecoration: 'none',
                            transition: 'color 0.3s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#e94560'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#b0b0b0'}
                    >
                        Contacte
                    </Link>
                </div>

                {/* Copyright */}
                <div style={{
                    fontSize: '0.875rem',
                    color: '#6c757d'
                }}>
                    <p style={{ margin: 0 }}>
                        Dades de{' '}
                        <a
                            href="https://www.themoviedb.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: '#2a9d8f',
                                textDecoration: 'none'
                            }}
                        >
                            TMDB
                        </a>
                    </p>
                    <p style={{ margin: '0.5rem 0 0 0' }}>
                        © 2025 Beyond Hollywood · Tots els drets reservats
                    </p>
                </div>
            </div>
        </footer>
    )
}
