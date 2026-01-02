import { NextResponse } from 'next/server'
import { getMovieById } from '@/lib/data-loader'

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const movieId = parseInt(id)
        const movie = getMovieById(movieId)

        if (!movie) {
            return NextResponse.json(
                { success: false, error: 'Movie not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({
            success: true,
            data: movie,
        })
    } catch (error) {
        console.error('Get movie error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch movie' },
            { status: 500 }
        )
    }
}
