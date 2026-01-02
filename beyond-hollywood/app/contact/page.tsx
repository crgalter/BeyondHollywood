'use client'

import React, { useState } from 'react'

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would normally send the data to an API
        console.log('Form submitted:', formData)
        setSubmitted(true)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const inputStyle = {
        width: '100%',
        padding: '0.875rem',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '0.75rem',
        color: '#f1f1f1',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.3s'
    }

    const labelStyle = {
        display: 'block',
        fontSize: '0.9rem',
        fontWeight: 600,
        color: '#b0b0b0',
        marginBottom: '0.5rem',
        marginTop: '1.5rem'
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: '#0a0a0f',
            color: '#f1f1f1',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            {/* Hero Section */}
            <div style={{
                background: 'linear-gradient(to bottom, #1a1a2e, #0a0a0f)',
                padding: '4rem 1.5rem',
                textAlign: 'center',
                borderBottom: '1px solid rgba(233, 69, 96, 0.2)'
            }}>
                <h1 style={{
                    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                    fontWeight: 800,
                    marginBottom: '1rem'
                }}>
                    Contacta amb nosaltres
                </h1>
                <p style={{
                    fontSize: '1.25rem',
                    color: '#b0b0b0',
                    maxWidth: '800px',
                    margin: '0 auto'
                }}>
                    Tens algun dubte, proposta o suggeriment? Ens encantaria escoltar-te.
                </p>
            </div>

            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                padding: '4rem 1.5rem'
            }}>
                {submitted ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '4rem',
                        background: 'rgba(233, 69, 96, 0.1)',
                        borderRadius: '2rem',
                        border: '1px solid #e94560'
                    }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>✉️</div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Gràcies pel teu missatge!</h2>
                        <p style={{ color: '#b0b0b0', fontSize: '1.1rem' }}>
                            Hem rebut la teva proposta i ens posarem en contacte amb tu el més aviat possible.
                        </p>
                        <button
                            onClick={() => setSubmitted(false)}
                            style={{
                                marginTop: '2rem',
                                padding: '0.75rem 2rem',
                                background: 'transparent',
                                border: '1px solid #e94560',
                                color: '#e94560',
                                borderRadius: '9999px',
                                cursor: 'pointer',
                                fontWeight: 600
                            }}
                        >
                            Enviar un altre missatge
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        padding: '3rem',
                        borderRadius: '2rem',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                    }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <label style={labelStyle as any}>Nom</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="El teu nom"
                                    style={inputStyle as any}
                                />
                            </div>
                            <div>
                                <label style={labelStyle as any}>Correu electrònic</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="hola@exemple.com"
                                    style={inputStyle as any}
                                />
                            </div>
                        </div>

                        <label style={labelStyle as any}>Assumpte</label>
                        <input
                            type="text"
                            name="subject"
                            required
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="En què et podem ajudar?"
                            style={inputStyle as any}
                        />

                        <label style={labelStyle as any}>Missatge</label>
                        <textarea
                            name="message"
                            required
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Escriu aquí el teu missatge o proposta detallada..."
                            rows={6}
                            style={{ ...inputStyle, resize: 'vertical' } as any}
                        />

                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                marginTop: '2.5rem',
                                padding: '1rem',
                                background: 'linear-gradient(to right, #e94560, #ff2e63)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '0.75rem',
                                fontSize: '1.1rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                transition: 'transform 0.2s, box-shadow 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)'
                                e.currentTarget.style.boxShadow = '0 10px 20px rgba(233, 69, 96, 0.3)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)'
                                e.currentTarget.style.boxShadow = 'none'
                            }}
                        >
                            Enviar Proposta
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}
