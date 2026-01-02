import { NextRequest, NextResponse } from 'next/server'
import { getRandomSurpriseMovie } from '@/lib/recommender'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const beyondHollywood = searchParams.get('beyondHollywood') === 'true'
    const hiddenGem = searchParams.get('hiddenGem') === 'true'
    const independent = searchParams.get('independent') === 'true'
    const genres = searchParams.get('genres')?.split(',').filter(Boolean)

    const filters = {
        beyondHollywood,
        hiddenGem,
        independent,
        genres
    }

    try {
        const movie = getRandomSurpriseMovie(filters)

        if (!movie) {
            return NextResponse.json({
                success: false,
                error: 'No movie found'
            }, { status: 404 })
        }

        // Fetch translated description
        const { getTranslatedMovieDetails } = await import('@/lib/tmdb')
        const translatedData = await getTranslatedMovieDetails(movie.id)

        const movieWithTranslation = {
            ...movie,
            overview: translatedData?.overview || movie.overview
        }

        return NextResponse.json({
            success: true,
            data: movieWithTranslation
        })
    } catch (error) {
        console.error('Surprise API error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch surprise movie' },
            { status: 500 }
        )
    }
}
