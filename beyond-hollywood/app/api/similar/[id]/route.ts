import { NextRequest, NextResponse } from 'next/server'
import { getSimilarMoviesWithFilters } from '@/lib/recommender'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const movieId = parseInt(id)
    const searchParams = request.nextUrl.searchParams

    const filterParams = {
        genres: searchParams.get('genres')?.split(',').filter(Boolean) || undefined,
        minRating: searchParams.get('minRating') ? parseFloat(searchParams.get('minRating')!) : undefined,
        yearFrom: searchParams.get('yearFrom') ? parseInt(searchParams.get('yearFrom')!) : undefined,
        yearTo: searchParams.get('yearTo') ? parseInt(searchParams.get('yearTo')!) : undefined,
        languages: searchParams.get('languages')?.split(',').filter(Boolean) || undefined,
        countries: searchParams.get('countries')?.split(',').filter(Boolean) || undefined,
        beyondHollywood: searchParams.get('beyondHollywood') !== 'false', // Default to true
        page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1,
        limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 20,
    }

    try {
        const result = getSimilarMoviesWithFilters(movieId, filterParams)

        return NextResponse.json({
            success: true,
            data: result.movies,
            total: result.total,
            page: filterParams.page,
            limit: filterParams.limit,
        })
    } catch (error) {
        console.error('Similar movies API error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed' },
            { status: 500 }
        )
    }
}
