import { NextResponse } from 'next/server'
import { getSimilarMovies } from '@/lib/recommender'

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const movieId = parseInt(id)
        const movies = getSimilarMovies(movieId, 20)

        return NextResponse.json({
            success: true,
            data: movies,
        })
    } catch (error) {
        console.error('Similar movies error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch similar movies' },
            { status: 500 }
        )
    }
}
