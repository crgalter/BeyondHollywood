import SearchBar from '@/components/SearchBar'
import CTAButtons from '@/components/CTAButtons'
import { countryTranslations } from '@/lib/catalan-text'
import MovieCarousel from '@/components/MovieCarousel'
import { getHomeCarousels } from '@/lib/home-carousels'

export const dynamic = 'force-dynamic'

export default function HomePage() {
    const {
        hiddenGems,
        countryMovies,
        randomCountry,
        independentCinema,
        internationalMovies
    } = getHomeCarousels()

    const countryName = countryTranslations[randomCountry] || randomCountry

    return (
        <div style={{
            minHeight: '100vh',
            background: '#0a0a0f',
            color: '#f1f1f1',
            fontFamily: 'var(--font-body)'
        }}>
            {/* Hero Section */}
            <div style={{
                position: 'relative',
                minHeight: '85vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(to bottom, #0a0a0f, #1a1a2e, #0a0a0f)',
                padding: '2rem'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    width: '100%',
                    textAlign: 'center'
                }}>
                    {/* Title */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '0.5rem'
                    }}>
                        <h1 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(3rem, 8vw, 6rem)',
                            fontWeight: 800,
                            margin: 0,
                            background: 'linear-gradient(to right, #ffffff, #888)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            letterSpacing: '-0.04em'
                        }}>
                            Beyond<span style={{ color: '#e94560', WebkitTextFillColor: '#e94560' }}>Hollywood</span>
                        </h1>
                    </div>

                    {/* Subtitle */}
                    <p style={{
                        fontSize: '1.5rem',
                        color: '#b0b0b0',
                        marginBottom: '3rem',
                        maxWidth: '800px',
                        margin: '0 auto 3rem'
                    }}>
                        Descobreix el cinema més enllà de les fronteres convencionals
                    </p>

                    {/* Search Section */}
                    <div style={{
                        maxWidth: '800px',
                        margin: '0 auto 4rem',
                        padding: '3rem',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '2rem',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
                    }}>
                        <h2 style={{
                            fontSize: '1.8rem',
                            fontWeight: 700,
                            marginBottom: '1rem',
                            color: '#f1f1f1'
                        }}>
                            Troba la teva propera obsessió cinèfila
                        </h2>
                        <p style={{
                            color: '#b0b0b0',
                            marginBottom: '2rem',
                            lineHeight: 1.6,
                            fontSize: '1.1rem'
                        }}>
                            Escriu el títol d'una pel·lícula que t'encanti i deixa que el nostre algorisme et guiï cap a joies similars d'arreu del món que mai hauries imaginat descobrir.
                        </p>
                        <SearchBar />
                    </div>

                    {/* CTA Buttons */}
                    <div style={{ marginBottom: '2rem' }}>
                        <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>O explora d'altres maneres</p>
                        <CTAButtons />
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '2rem 2rem 6rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '4rem'
            }}>

                {countryMovies.length > 0 && (
                    <MovieCarousel
                        title="Un país, una mirada"
                        subtitle={`Explorant la riquesa cinematogràfica de: ${countryName}`}
                        movies={countryMovies}
                        viewMoreLink={`/recomanacions/internacional?country=${encodeURIComponent(randomCountry)}`}
                    />
                )}

                {independentCinema.length > 0 && (
                    <MovieCarousel
                        title="Cinema independent"
                        subtitle="Grans històries creades amb pressupostos modestos"
                        movies={independentCinema}
                        viewMoreLink="/recomanacions/baix-pressupost"
                    />
                )}

                {internationalMovies.length > 0 && (
                    <MovieCarousel
                        title="Més enllà dels EUA"
                        subtitle="Produccions internacionals de tot el món"
                        movies={internationalMovies}
                        viewMoreLink="/recomanacions/internacional"
                    />
                )}

                {hiddenGems.length > 0 && (
                    <MovieCarousel
                        title="Joies amagades"
                        subtitle="Pel·lícules poc conegudes amb valoracions excel·lents"
                        movies={hiddenGems}
                        viewMoreLink="/recomanacions/joies-ocultes"
                    />
                )}

                {hiddenGems.length === 0 && countryMovies.length === 0 && (
                    <div style={{
                        textAlign: 'center',
                        padding: '4rem 2rem',
                        background: '#12121a',
                        borderRadius: '1rem',
                        border: '1px solid #e94560'
                    }}>
                        <p style={{ fontSize: '1.25rem', color: '#b0b0b0', marginBottom: '1.5rem' }}>
                            No hi ha dades disponibles
                        </p>
                        <p style={{ color: '#e94560', marginBottom: '1rem' }}>
                            Executeu el script de preprocessament:
                        </p>
                        <code style={{
                            display: 'block',
                            padding: '1rem',
                            background: '#0a0a0f',
                            borderRadius: '0.5rem',
                            color: '#06ffa5',
                            fontSize: '0.9rem'
                        }}>
                            cd backend && python preprocess_data.py
                        </code>
                    </div>
                )}
            </div>
        </div >
    )
}
