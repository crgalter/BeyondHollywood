import RecommendationsList from '@/components/RecommendationsList'
import { getHiddenGems, getInternationalPicks, getLowBudgetTreasures } from '@/lib/recommender'
import { Movie } from '@/lib/types'
import { notFound } from 'next/navigation'
import { countryTranslations } from '@/lib/catalan-text'
import { loadMetadata } from '@/lib/data-loader'

export default async function RecommendationsPage({
    params,
    searchParams
}: {
    params: Promise<{ mode: string }>,
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const { mode } = await params
    const sParams = await searchParams
    const country = typeof sParams.country === 'string' ? sParams.country : undefined
    const metadata = loadMetadata()

    let movies: Movie[] = []
    let title = ''
    let description = ''
    let emoji = ''
    let gradient = ''

    // Initial filters from URL
    const initialFilters = {
        countries: country ? [country] : undefined
    }

    switch (mode) {
        case 'joies-ocultes':
            movies = getHiddenGems({}, 60)
            title = 'Joies Ocultes'
            description = 'Pel·lícules amb puntuacions altes però poca visibilitat'
            gradient = 'linear-gradient(to right, #9d4edd, #e94560)'
            break
        case 'internacional':
            movies = getInternationalPicks(initialFilters, 60)
            title = country ? `Cinema de ${countryTranslations[country] || country}` : 'Cinema Internacional'
            description = country
                ? `Explorant les millors obres cinematogràfiques de ${countryTranslations[country] || country}`
                : 'Pel·lícules de tot el món, més enllà d\'Hollywood'
            gradient = 'linear-gradient(to right, #2a9d8f, #118ab2)'
            break
        case 'baix-pressupost':
            movies = getLowBudgetTreasures({}, 60)
            title = 'Tresors de Baix Pressupost'
            description = 'Grans pel·lícules fetes amb pressupost reduït'
            gradient = 'linear-gradient(to right, #06ffa5, #2a9d8f)'
            break
        default:
            notFound()
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: '#0a0a0f',
            padding: '3rem 1.5rem'
        }}>
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto'
            }}>
                {/* Header */}
                <div style={{
                    marginBottom: '3rem',
                    textAlign: 'center'
                }}>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: 700,
                        marginBottom: '1.5rem',
                        background: gradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        padding: '0.2em 0'
                    }}>
                        {title}
                    </h1>
                    <p style={{
                        fontSize: '1.25rem',
                        color: '#b0b0b0',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        {description}
                    </p>
                </div>

                {/* Movies List */}
                <RecommendationsList
                    initialMovies={movies}
                    mode={mode}
                    metadata={metadata}
                    initialCountry={country}
                />
            </div>
        </div>
    )
}
