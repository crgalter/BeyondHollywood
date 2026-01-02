import { NextRequest, NextResponse } from 'next/server'
import { searchMovies } from '@/lib/recommender'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams

    const params = {
        q: searchParams.get('q') || undefined,
        genres: searchParams.get('genres')?.split(',').filter(Boolean) || undefined,
        minRating: searchParams.get('minRating') ? parseFloat(searchParams.get('minRating')!) : undefined,
        yearFrom: searchParams.get('yearFrom') ? parseInt(searchParams.get('yearFrom')!) : undefined,
        yearTo: searchParams.get('yearTo') ? parseInt(searchParams.get('yearTo')!) : undefined,
        runtime: searchParams.get('runtime')?.split(',').filter(Boolean) || undefined,
        languages: searchParams.get('languages')?.split(',').filter(Boolean) || undefined,
        countries: searchParams.get('countries')?.split(',').filter(Boolean) || undefined,
        budget: searchParams.get('budget')?.split(',').filter(Boolean) || undefined,
        popularity: searchParams.get('popularity')?.split(',').filter(Boolean) || undefined,
        beyondHollywood: searchParams.get('beyondHollywood') === 'true',
        page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1,
        limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 20,
        sort: searchParams.get('sort') || 'relevant',
    }

    try {
        const result = searchMovies(params)

        return NextResponse.json({
            success: true,
            data: result.movies,
            total: result.total,
            page: params.page,
            limit: params.limit,
        })
    } catch (error) {
        console.error('Search error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to search movies' },
            { status: 500 }
        )
    }
}
