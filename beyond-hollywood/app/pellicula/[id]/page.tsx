import { getMovieById } from '@/lib/data-loader'
import { getSimilarMoviesWithFilters } from '@/lib/recommender'
import { text, genreTranslations, languageTranslations, countryTranslations, formatCurrency } from '@/lib/catalan-text'
import MovieCard from '@/components/MovieCard'
import SimilarMoviesSection from '@/components/SimilarMoviesSection'
import { notFound } from 'next/navigation'
import { WatchProvider } from '@/lib/types'

async function getWatchProviders(movieId: number) {
    const apiKey = process.env.TMDB_API_KEY
    if (!apiKey) return null

    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${apiKey}`,
            { next: { revalidate: 86400 } }
        )
        const data = await response.json()
        // We use 'ES' for providers in the Spanish/Catalan market
        return data.results?.ES || null
    } catch (error) {
        console.error('Error fetching watch providers:', error)
        return null
    }
}

async function getMovieDirector(movieId: number) {
    const apiKey = process.env.TMDB_API_KEY
    if (!apiKey) return null

    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`,
            { next: { revalidate: 86400 } }
        )
        const data = await response.json()
        const director = data.crew?.find((person: any) => person.job === 'Director')
        return director ? director.name : null
    } catch (error) {
        console.error('Error fetching movie director:', error)
        return null
    }
}

async function getTranslatedMovieDetails(movieId: number) {
    const apiKey = process.env.TMDB_API_KEY
    if (!apiKey) return null

    try {
        // Fetch in Catalan
        const responseCa = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=ca-ES`,
            { next: { revalidate: 86400 } }
        )
        const dataCa = await responseCa.json()

        // If Catalan overview is missing, try English
        if (!dataCa.overview) {
            const responseEn = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`,
                { next: { revalidate: 86400 } }
            )
            const dataEn = await responseEn.json()
            if (dataEn.overview) dataCa.overview = dataEn.overview
        }

        return dataCa
    } catch (error) {
        console.error('Error fetching translated details:', error)
        return null
    }
}

export default async function MovieDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const movieId = parseInt(id)
    const movie = getMovieById(movieId)

    if (!movie) {
        notFound()
    }

    const { movies: initialSimilarMovies } = getSimilarMoviesWithFilters(movieId, {
        beyondHollywood: true,
        limit: 12
    })
    const [providers, director, translatedData] = await Promise.all([
        getWatchProviders(movieId),
        getMovieDirector(movieId),
        getTranslatedMovieDetails(movieId)
    ])

    const movieOverview = translatedData?.overview || movie.overview

    // Automatic country translation using Intl API
    const regionNamesCa = new Intl.DisplayNames(['ca'], { type: 'region' })
    const translatedCountries = translatedData?.production_countries?.map((c: any) => {
        try {
            return regionNamesCa.of(c.iso_3166_1)
        } catch {
            return countryTranslations[c.name] || c.name
        }
    }) || movie.production_countries.map(c => countryTranslations[c] || c)
    const backdropUrl = movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : ''
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : ''

    return (
        <div style={{
            minHeight: '100vh',
            background: '#0a0a0f',
            color: '#f1f1f1'
        }}>
            {/* Hero Section with Backdrop */}
            <div style={{ position: 'relative' }}>
                {/* Backdrop Image */}
                {backdropUrl && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden'
                    }}>
                        <img
                            src={backdropUrl}
                            alt={movie.title}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                filter: 'blur(20px)',
                                transform: 'scale(1.1)',
                                opacity: 0.3
                            }}
                        />
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to bottom, rgba(10,10,15,0.7), #0a0a0f 80%)'
                        }} />
                    </div>
                )}

                {/* Content */}
                <div style={{
                    position: 'relative',
                    maxWidth: '1400px',
                    margin: '0 auto',
                    padding: '4rem 1.5rem',
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gap: '3rem',
                    alignItems: 'start'
                }}>
                    {/* Poster */}
                    {posterUrl && (
                        <img
                            src={posterUrl}
                            alt={movie.title}
                            style={{
                                width: '300px',
                                borderRadius: '1rem',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
                            }}
                        />
                    )}

                    {/* Movie Info */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <h1 style={{
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            fontWeight: 700,
                            margin: 0
                        }}>
                            {movie.title}
                        </h1>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            {director && (
                                <p style={{
                                    fontSize: '1.25rem',
                                    color: '#e94560',
                                    fontWeight: 600,
                                    margin: 0
                                }}>
                                    Dirigida per {director}
                                </p>
                            )}

                            {translatedCountries && translatedCountries.length > 0 && (
                                <p style={{
                                    fontSize: '1.1rem',
                                    color: '#b0b0b0',
                                    fontWeight: 400,
                                    margin: '0.25rem 0 0 0'
                                }}>
                                    {translatedCountries.length > 1 ? 'Països' : 'País'}: {translatedCountries.join(', ')}
                                </p>
                            )}

                            {movie.original_title !== movie.title && (
                                <p style={{ color: '#b0b0b0', margin: 0 }}>
                                    {text.details.originalTitle}: {movie.original_title}
                                </p>
                            )}
                        </div>

                        {movie.tagline && (
                            <p style={{
                                fontSize: '1.25rem',
                                color: '#b0b0b0',
                                fontStyle: 'italic',
                                margin: 0
                            }}>
                                "{movie.tagline}"
                            </p>
                        )}

                        {/* Rating & Info */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.5rem',
                            flexWrap: 'wrap'
                        }}>
                            {movie.vote_average > 0 && (
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.5rem 1rem',
                                    background: 'rgba(233, 69, 96, 0.2)',
                                    borderRadius: '0.5rem',
                                    border: '1px solid #e94560'
                                }}>
                                    <span style={{ color: '#f4a261', fontSize: '1.5rem' }}>★</span>
                                    <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                                        {movie.vote_average.toFixed(1)}
                                    </span>
                                </div>
                            )}

                            <div style={{ color: '#b0b0b0' }}>
                                {movie.year && <span>{movie.year}</span>}
                                {movie.year && movie.runtime > 0 && <span> · </span>}
                                {movie.runtime > 0 && <span>{movie.runtime} min</span>}
                            </div>
                        </div>

                        {/* Genres */}
                        {movie.genres.length > 0 && (
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '0.5rem'
                            }}>
                                {movie.genres.map((genre) => (
                                    <span
                                        key={genre}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            borderRadius: '0.5rem',
                                            fontSize: '0.875rem',
                                            border: '1px solid rgba(255, 255, 255, 0.2)'
                                        }}
                                    >
                                        {genreTranslations[genre] || genre}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Overview */}
                        {movieOverview && (
                            <div>
                                <h2 style={{
                                    fontSize: '1.5rem',
                                    marginBottom: '1rem',
                                    color: '#e94560'
                                }}>
                                    {text.details.synopsis}
                                </h2>
                                <p style={{
                                    fontSize: '1.125rem',
                                    lineHeight: 1.7,
                                    color: '#e0e0e0',
                                    margin: 0
                                }}>
                                    {movieOverview}
                                </p>
                            </div>
                        )}

                        {/* Watch Providers */}
                        {providers && (providers.flatrate || providers.rent || providers.buy) && (
                            <div style={{
                                padding: '1.5rem',
                                background: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: '1rem',
                                border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}>
                                <h2 style={{
                                    fontSize: '1.25rem',
                                    fontWeight: 600,
                                    marginBottom: '1rem',
                                    color: '#f1f1f1'
                                }}>
                                    {text.details.watchProviders || 'On veure-la'}
                                </h2>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    {providers.flatrate && (
                                        <div>
                                            <div style={{ fontSize: '0.875rem', color: '#b0b0b0', marginBottom: '0.5rem' }}>{text.details.streaming || 'Streaming'}</div>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                                {providers.flatrate.map((p: WatchProvider) => (
                                                    <img
                                                        key={p.provider_id}
                                                        src={`https://image.tmdb.org/t/p/original${p.logo_path}`}
                                                        alt={p.provider_name}
                                                        title={p.provider_name}
                                                        style={{ width: '40px', height: '40px', borderRadius: '0.5rem' }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {(providers.rent || providers.buy) && (
                                        <div>
                                            <div style={{ fontSize: '0.875rem', color: '#b0b0b0', marginBottom: '0.5rem' }}>{text.details.rentOrBuy || 'Lloguer o Compra'}</div>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                                {/* Combine rent and buy providers, removing duplicates */}
                                                {Array.from(new Map([
                                                    ...(providers.rent || []),
                                                    ...(providers.buy || [])
                                                ].map(p => [p.provider_id, p])).values()).map((p: WatchProvider) => (
                                                    <img
                                                        key={p.provider_id}
                                                        src={`https://image.tmdb.org/t/p/original${p.logo_path}`}
                                                        alt={p.provider_name}
                                                        title={p.provider_name}
                                                        style={{ width: '35px', height: '35px', borderRadius: '0.5rem', opacity: 0.8 }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <p style={{ fontSize: '0.65rem', color: '#6c757d', marginTop: '1.4rem', margin: 0 }}>
                                    Dades proporcionades per JustWatch a través de TMDB.
                                </p>
                            </div>
                        )}

                        {/* Additional Info */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '1.5rem',
                            paddingTop: '1rem',
                            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                            {movie.budget > 0 && (
                                <div>
                                    <div style={{ color: '#b0b0b0', marginBottom: '0.5rem' }}>{text.details.budget}</div>
                                    <div style={{ fontSize: '1.125rem' }}>{formatCurrency(movie.budget)}</div>
                                </div>
                            )}

                            {movie.revenue > 0 && (
                                <div>
                                    <div style={{ color: '#b0b0b0', marginBottom: '0.5rem' }}>{text.details.revenue}</div>
                                    <div style={{ fontSize: '1.125rem' }}>{formatCurrency(movie.revenue)}</div>
                                </div>
                            )}

                            {movie.original_language && (
                                <div>
                                    <div style={{ color: '#b0b0b0', marginBottom: '0.5rem' }}>{text.details.originalLanguage}</div>
                                    <div style={{ fontSize: '1.125rem' }}>
                                        {languageTranslations[movie.original_language] || movie.original_language}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Similar Movies */}
            {initialSimilarMovies.length > 0 && (
                <SimilarMoviesSection
                    movieId={movieId}
                    initialMovies={initialSimilarMovies}
                />
            )}
        </div>
    )
}
