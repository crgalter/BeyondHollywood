import { getMovieById, loadMetadata } from '@/lib/data-loader'
import { getSimilarMoviesWithFilters } from '@/lib/recommender'
import SimilarResultsClient from '@/components/SimilarResultsClient'
import { notFound } from 'next/navigation'

export default async function SimilarResultsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const movieId = parseInt(id)
    const movie = getMovieById(movieId)

    if (!movie) {
        notFound()
    }

    const metadata = loadMetadata()

    // Initial results with default Beyond Hollywood filter
    const { movies } = getSimilarMoviesWithFilters(movieId, {
        beyondHollywood: true,
        limit: 20
    })

    return (
        <SimilarResultsClient
            movieId={movieId}
            seedMovie={movie}
            initialMovies={movies}
            metadata={metadata}
        />
    )
}
